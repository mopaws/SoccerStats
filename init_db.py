import os
import psycopg2
from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

conn = psycopg2.connect(
        host="drhscit.org",
        database=os.environ['DB'],
        user=os.environ['DB_UN'],
        password=os.environ['DB_PW'])

cur = conn.cursor()

# Insert data into the table
un='statsAdmin'           #username
fn='Test'            #First Name
ln='Admin'           #Last Name
em='admin@here.com'  #Email
pw='drhs2025'           #Plain text password
ad='true'            #isAdmin
ro='false'           #isReadOnly
ed='false'             #iseditor

#first delete a record for this username
cur.execute('delete from dr_users where username = %s;', (un,)  )

#hash the password
hashed_password = bcrypt.generate_password_hash(pw).decode('utf-8')

#now insert it and commit changes
cur.execute('INSERT INTO dr_users (username, firstname, lastname, email,  password_hash, isadmin, isreadonly, iseditor)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            (un, fn,ln, em,hashed_password, ad, ro, ed)
            )

un2='statsViewer'
fn2='Second'
ln2='Viewer'
em2='view@here.com'
pw2='drhsViewing1'
ad2='false'
ro2='true'
ed2='false'             

cur.execute('DELETE FROM dr_users WHERE username = %s;', (un2,))
hashed_password2 = bcrypt.generate_password_hash(pw2).decode('utf-8')
cur.execute('INSERT INTO dr_users (username, firstname, lastname, email, password_hash, isadmin, isreadonly, iseditor) '
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s);',
            (un2, fn2, ln2, em2, hashed_password2, ad2, ro2, ed2))


un3='statsEditor'           #username
fn3='Third'            #First Name
ln3='Editor'           #Last Name
em3='editor@here.com'  #Email
pw3='drhsEditing25'           #Plain text password
ad3='false'            #isAdmin
ro3='false'           #isReadOnly
ed3='true'             #iseditor

#first delete a record for this username
cur.execute('delete from dr_users where username = %s;', (un3,)  )

#hash the password
hashed_password3 = bcrypt.generate_password_hash(pw3).decode('utf-8')

#now insert it and commit changes
cur.execute('INSERT INTO dr_users (username, firstname, lastname, email,  password_hash, isadmin, isreadonly, iseditor)'
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            (un3, fn3,ln3, em3,hashed_password3, ad3, ro3, ed3)
            )

conn.commit()

conn.commit()
cur.execute('SELECT username, isadmin, isreadonly, iseditor FROM dr_users;')
for row in cur.fetchall():
    print(row)

#Now let's see what we got
cur.execute('Select * from dr_users where username = %s',(un,))
data = cur.fetchone()
print(data)
if data and bcrypt.check_password_hash(data[5], pw):
    print ('EUREKA!  Password hashes match!')
else:
    print('Incorrect Password or Username')

cur.close()
conn.close()

cur.execute('DROP TABLE IF EXISTS scouting_report;')
cur.execute('DROP TABLE IF EXISTS game_report;')
cur.execute('DROP TABLE IF EXISTS dr_users;')


cur.execute('CREATE TABLE scouting_report (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,'
                                 'team TEXT NOT NULL,'
                                 'playstyle TEXT,'
                                 'corners TEXT,'
                                 'players_to_watch TEXT,'
                                 'goalkeeper TEXT,'                                 
                                 'team_notes TEXT,'
                                 'roster TEXT,'
                                 'date_added DATE DEFAULT CURRENT_DATE,'
                                 'image BYTEA,'
                                 'mimetype VARCHAR(100));'
                                 )
cur.execute('CREATE TABLE game_report (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,'
                                 'team_game TEXT NOT NULL,'
                                 'level TEXT NOT NULL,'
                                 'home_goals Integer,'
                                 'opponent_goals Integer,'
                                 'goal_scorer text,'
                                 'assister text,'
                                 'goal_description TEXT,'
                                 'goalie_saves Integer,'
                                 'home_corner_kicks Integer,'
                                 'opponent_corner_kicks Integer,'
                                 'fouls Integer,'
                                 'home_goal_kicks Integer,'
                                 'opponent_goal_kicks Integer,'
                                 'lineup TEXT,'
                                 'field_conditions TEXT,'
                                 'weather_conditions TEXT,'                                 
                                 'date_added DATE DEFAULT CURRENT_DATE,'
                                'shots_on_goal Integer,'
                                'player_shots TEXT,'
                                'direct_kicks integer,'
                                'indirect_kicks integer,'
                                 'notes TEXT,'
                                 'opponent_shots_on_goal Integer,'
                                 'opponent_direct_kicks integer,'
                                 'opponent_indirect_kicks integer,'
                                 'opponent_goalie_saves Integer);'
                                 )
                                cur.execute('CREATE TABLE dr_users (id SERIAL PRIMARY KEY,'
                                'username VARCHAR(50) UNIQUE NOT NULL,'
                                'firstname varchar(50) NOT NULL,'
                                'lastname varchar(50) NOT NULL,'
                                'email VARCHAR(100),'
                                'password_hash VARCHAR(128) NOT NULL,'
                                'isadmin boolean default FALSE,'
                                'isreadonly boolean default FALSE,'
                                'Constraint perm_ck check ((isadmin = true and isreadonly = true)=false));'
                                )

conn.commit()

cur.close()
conn.close()
