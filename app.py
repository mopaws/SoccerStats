import os, io
import psycopg2
from dotenv import load_dotenv
from flask import Flask, render_template, request, url_for, redirect, send_file
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from flask import flash
from functools import wraps
from flask import abort

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return login_manager.unauthorized()
        if current_user.isadmin:
            return f(*args, **kwargs)
        abort(403)
    return decorated_function

def editor_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return login_manager.unauthorized()
        if current_user.isadmin or current_user.iseditor:
            return f(*args, **kwargs)
        abort(403)
    return decorated_function

load_dotenv()
app = Flask(__name__)


app.config['SECRET_KEY'] = 'your_secret_key' #must do better
login_manager = LoginManager(app)
login_manager.login_view = 'login' #redirects to this function
                                   #if not logged in 
bcrypt = Bcrypt(app)

class User(UserMixin):
 def __init__(self, id, username, firstname, lastname,
      email, isadmin, isreadonly, iseditor, password_hash):
   self.id = id
   self.username = username
   self.firstname = firstname
   self.lastname = lastname
   self.email = email
   self.isadmin = isadmin
   self.isreadonly = isreadonly
   self.iseditor = iseditor
   self.password_hash = password_hash

@login_manager.user_loader
def load_user(user_id):
   conn = get_db_connection()
   cur = conn.cursor()
   cur.execute('SELECT id, username, firstname, lastname, '
               'email, password_hash, isadmin, isreadonly, iseditor '
                 'FROM dr_users WHERE id = %s', (user_id,))
   user = cur.fetchone()
   cur.close()
   conn.close()
   if user:
     app.logger.debug(user[1])
     return User(id=user[0], username=user[1],
                 firstname=user[2],lastname=user[3],
                 email=user[4], password_hash=user[5],
                 isadmin=user[6], isreadonly=user[7], iseditor=user[8]
                )
   return None

def get_db_connection():
    conn = psycopg2.connect(
        host='drhscit.org', 
        database=os.environ['DB'],
        user=os.environ['DB_UN'], 
        password=os.environ['DB_PW'])
    return conn


@app.route('/login', methods=('GET', 'POST'))
def login():
   if request.method == 'POST':
     #get info from form
     username = request.form['username']
     password = request.form['password']
     
     #get info from database
     conn = get_db_connection()
     cur = conn.cursor()
     cur.execute('SELECT id, username, '
                ' firstname, lastname, '
                ' email, password_hash, '
                ' isadmin, isreadonly, iseditor '
                 ' FROM dr_users '
        ' WHERE username = %s', (username,))
     user = cur.fetchone()
     cur.close()
     conn.close()
     if user:
        print(user)
     else:
        print('No Record found!')
     #Check the username and password
     if user and bcrypt.check_password_hash(user[5], 
              password.encode('utf-8')):
       #We're good!
       user_obj = User(id=user[0], username=user[1],
                       firstname=user[2], lastname=user[3],
                       email=user[4], password_hash=user[5],
                       isadmin=user[6], isreadonly=user[7], iseditor=user[8])
       login_user(user_obj)
       nxt= request.args.get('next')
       if nxt:
         return redirect(nxt or url_for('index'))  
       return redirect(url_for('home'))
     else:
       #Invalid username / password combo
       flash('Login Unsuccessful. '
          'Please check username and password', 'danger')
   return render_template('index.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/image/<int:image_id>')
def get_image(image_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT image,mimetype FROM scouting_report where id = %s;',(image_id,))
    data = cur.fetchone()
    cur.close()
    conn.close()
    return send_file(io.BytesIO(data[0]), mimetype=data[1])

@app.route('/audio/<int:image_id>')
def get_audio(image_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT image,mimetype FROM scouting_report where id = %s;',(image_id,))
    data = cur.fetchone()
    cur.close()
    conn.close()
    return send_file(io.BytesIO(data[0]), mimetype=data[1])
#How can we display an image or other type of media file? 


@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/home')
@login_required
def home():
    return render_template('home.html')

@app.route('/main')
@login_required
@editor_required
def main():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, team, playstyle, roster, corners, goalkeeper, team_notes, date_added, players_to_watch, mimetype FROM scouting_report ORDER BY team,date_added DESC;')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('main.html', scouting_report=data)

@app.route('/gameReport')
@login_required
def gameReport():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM game_report ORDER BY date_added DESC, team_game, level;')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('gameReport.html', game_report=data)


@app.route('/create/', methods=('GET', 'POST'))
@login_required
@editor_required
def create():
    if request.method == 'POST':
        team = request.form['team']
        playstyle = request.form['playstyle']
        corners = request.form['corners']
        players_to_watch = request.form['players_to_watch']
        goalkeeper = request.form['goalkeeper']
        team_notes = request.form['team_notes']
        roster = request.form['roster']
        file=request.files['theImage']

        conn = get_db_connection()
        cur = conn.cursor()
        if file:
            cur.execute('INSERT INTO scouting_report (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster, image, mimetype)'
                        'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster, file.read(), file.mimetype))
        else:
           cur.execute('INSERT INTO scouting_report (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster)'
                        'VALUES (%s, %s, %s, %s, %s, %s, %s)',
                        (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('main'))

    return render_template('create.html')


@app.route('/delete/<int:id>/')
@admin_required
@login_required
def delete(id):
    #Your code here - what should happen when a user clicks "Delete Review" on a particular review (with the specified id)? 
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM scouting_report WHERE %s=id',(id,))
    conn.commit()
    cur.close()
    conn.close()
    #Note - no need to change the code below - this will redirect the user back to the reviews page once they've deleted a review.
    return redirect(url_for('main'))

@app.route('/edit/<int:id>', methods = ('GET', 'POST'))
@login_required
@editor_required
def edit(id):
    #GET:
    if request.method == 'GET':
        #Your code here - what should happen when a user clicks "Edit Review" on a particular review (with the specified id)?

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM scouting_report WHERE id=%s',(id,))
        data = cur.fetchall()
        cur.close()
        conn.close()
        print(data)

        return render_template('edit.html', scouting_report=data[0], encs=[data])
        #Note - you will need to change the render_template code segment below to pass in information to the edit.html template (once you have modified edit.html).
    
    #POST:
    elif request.method == 'POST':
        #Your code here - what should happen when the user submits their edited review (for the review with the given id)?
        team = request.form['team']
        playstyle = request.form['playstyle']
        corners = request.form['corners']
        players_to_watch = request.form['players_to_watch']
        goalkeeper = request.form['goalkeeper']
        team_notes = request.form['team_notes']
        roster = request.form['roster']
        file=request.files['theImage']

        conn = get_db_connection()
        cur = conn.cursor()
        if file and file.filename != '':
            cur.execute('UPDATE scouting_report SET team=%s, playstyle=%s, corners=%s, players_to_watch=%s, goalkeeper=%s, team_notes=%s, roster=%s, image=%s, mimetype=%s WHERE id=%s',
                        (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster, file.read(), file.mimetype, id))
        else:
            cur.execute('UPDATE scouting_report SET team=%s, playstyle=%s, corners=%s, players_to_watch=%s, goalkeeper=%s, team_notes=%s, roster=%s WHERE id=%s',
                        (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster, id))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('main'))





@app.route('/createReport/', methods=('GET', 'POST'))
@login_required
@admin_required
def createReport():
    if request.method == 'POST':
        team_game = request.form['team_game']
        level = request.form['level']
        home_goals = int(request.form['home_goals'])
        opponent_goals = int(request.form['opponent_goals'])
        goal_scorer = request.form['goal_scorer']
        assister = request.form['assister']
        goal_description = request.form['goal_description']
        goalie_saves = int(request.form['goalie_saves'])
        home_corner_kicks = int(request.form['home_corner_kicks'])
        opponent_corner_kicks = int(request.form['opponent_corner_kicks'])
        fouls = int(request.form['fouls'])
        home_goal_kicks = int(request.form['home_goal_kicks'])
        opponent_goal_kicks = int(request.form['opponent_goal_kicks'])
        lineup = request.form['lineup']
        field_conditions = request.form['field_conditions']
        weather_conditions = request.form['weather_conditions']
        shots_on_goal = int(request.form['shots_on_goal'])
        player_shots = request.form['player_shots']
        direct_kicks = int(request.form['direct_kicks'])
        indirect_kicks = int(request.form['indirect_kicks'])
        notes = request.form['notes']
        opponent_shots_on_goal = int(request.form['opponent_shots_on_goal'])
        opponent_direct_kicks = int(request.form['opponent_direct_kicks'])
        opponent_indirect_kicks = int(request.form['opponent_indirect_kicks'])
        opponent_goalie_saves = int(request.form['opponent_goalie_saves'])


        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO game_report (team_game, level, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions, shots_on_goal, player_shots, direct_kicks, indirect_kicks, notes, opponent_shots_on_goal, opponent_direct_kicks, opponent_indirect_kicks, opponent_goalie_saves)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                    (team_game, level, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions, shots_on_goal, player_shots, direct_kicks, indirect_kicks, notes, opponent_shots_on_goal, opponent_direct_kicks, opponent_indirect_kicks, opponent_goalie_saves))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('gameReport'))

    return render_template('createReport.html')

@app.route('/deleteGame/<int:id>/')
@login_required
@admin_required
def deleteGame(id):
    #Your code here - what should happen when a user clicks "Delete Review" on a particular review (with the specified id)? 
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM game_report WHERE %s=id',(id,))
    conn.commit()
    cur.close()
    conn.close()
    #Note - no need to change the code below - this will redirect the user back to the reviews page once they've deleted a review.
    return redirect(url_for('gameReport'))

@app.route('/editGames/<int:id>', methods = ('GET', 'POST'))
@login_required
@admin_required
def editGames(id):
    #GET:
    if request.method == 'GET':
        #Your code here - what should happen when a user clicks "Edit Review" on a particular review (with the specified id)?

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM game_report WHERE id=%s',(id,))
        data = cur.fetchall()
        cur.close()
        conn.close()
        print(data)

        return render_template('editGames.html', game_report=data[0])
        #Note - you will need to change the render_template code segment below to pass in information to the edit.html template (once you have modified edit.html).
    
    #POST:
    elif request.method == 'POST':
        #Your code here - what should happen when the user submits their edited review (for the review with the given id)?
        team_game = request.form['team_game']
        level = request.form['level']
        home_goals = int(request.form['home_goals'])
        opponent_goals = int(request.form['opponent_goals'])
        goal_scorer = request.form['goal_scorer']
        assister = request.form['assister']
        goal_description = request.form['goal_description']
        goalie_saves = int(request.form['goalie_saves'])
        home_corner_kicks = int(request.form['home_corner_kicks'])
        opponent_corner_kicks = int(request.form['opponent_corner_kicks'])
        fouls = int(request.form['fouls'])
        home_goal_kicks = int(request.form['home_goal_kicks'])
        opponent_goal_kicks = int(request.form['opponent_goal_kicks'])
        lineup = request.form['lineup']
        field_conditions = request.form['field_conditions']
        weather_conditions = request.form['weather_conditions']
        shots_on_goal = int(request.form['shots_on_goal'])
        player_shots = request.form['player_shots']
        direct_kicks = int(request.form['direct_kicks'])
        indirect_kicks = int(request.form['indirect_kicks'])
        notes = request.form['notes']
        opponent_shots_on_goal = int(request.form['opponent_shots_on_goal'])
        opponent_direct_kicks = int(request.form['opponent_direct_kicks'])
        opponent_indirect_kicks = int(request.form['opponent_indirect_kicks'])
        opponent_goalie_saves = int(request.form['opponent_goalie_saves'])

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO game_report (team_game, level, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions, shots_on_goal, player_shots, direct_kicks, indirect_kicks, notes, opponent_shots_on_goal, opponent_direct_kicks, opponent_indirect_kicks, opponent_goalie_saves)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                    (team_game, level, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions, shots_on_goal, player_shots, direct_kicks, indirect_kicks, notes, opponent_shots_on_goal, opponent_direct_kicks, opponent_indirect_kicks, opponent_goalie_saves))
        cur.execute('DELETE FROM game_report WHERE id=%s',(id,))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('gameReport'))


if __name__ == '__main__':
    app.run(debug=True)
