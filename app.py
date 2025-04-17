import os
import psycopg2
from flask import Flask, render_template, request, url_for, redirect


app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host='drhscit.org', 
        database=os.environ['DB'],
        user=os.environ['DB_UN'], 
        password=os.environ['DB_PW'])
    return conn

@app.route('/')
def main():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM scouting_report ORDER BY team,date_added DESC;')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('main.html', scouting_report=data)

@app.route('/gameReport')
def gameReport():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM game_report ORDER BY team_game,date_added DESC;')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('gameReport.html', game_report=data)


@app.route('/create/', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        team = request.form['team']
        playstyle = request.form['playstyle']
        corners = request.form['corners']
        players_to_watch = request.form['players_to_watch']
        goalkeeper = request.form['goalkeeper']
        team_notes = request.form['team_notes']
        roster = request.form['roster']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO scouting_report (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('main'))

    return render_template('create.html')

@app.route('/delete/<int:id>/')
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

        return render_template('edit.html', scouting_report=data[0])
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

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO scouting_report (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (team, playstyle, corners, players_to_watch, goalkeeper, team_notes, roster))
        cur.execute('DELETE FROM scouting_report WHERE id=%s',(id,))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('main'))





@app.route('/createGame/', methods=('GET', 'POST'))
def createReport():
    if request.method == 'POST':
        team_game = request.form['team_game']
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

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO game_report (team_game, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                    (team_game, home_goals, opponent_goals, goal_scorer, assister, goal_description, goalie_saves, home_corner_kicks, opponent_corner_kicks, fouls, home_goal_kicks, opponent_goal_kicks, lineup, field_conditions, weather_conditions))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('gameReport'))

    return render_template('createReport.html')

@app.route('/deleteGame/<int:id>/')
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


if __name__ == '__main__':
    app.run(debug=True)
