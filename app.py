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
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM scouting_report ORDER BY team,date_added DESC;')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', scouting_report=data)

@app.route('/create/', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        team = request.form['team']
        players_to_watch = request.form['players_to_watch']
        team_notes = request.form['team_notes']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO scouting_report (team, players_to_watch, team_notes)'
                    'VALUES (%s, %s, %s)',
                    (team, players_to_watch, team_notes))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('index'))

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
    return redirect(url_for('index'))

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
        players_to_watch = request.form['players_to_watch']
        team_notes = request.form['team_notes']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO scouting_report (team, players_to_watch, team_notes)'
                    'VALUES (%s, %s, %s)',
                    (team, players_to_watch, team_notes))
        cur.execute('DELETE FROM scouting_report WHERE id=%s',(id,))
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('index'))

        #Note - no need to change the code below - this will redirect the user back to the reviews page once they've submitted their edited review. 
        return redirect(url_for('index'))
        


if __name__ == '__main__':
    app.run(debug=True)
