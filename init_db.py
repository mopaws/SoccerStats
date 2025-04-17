import os
import psycopg2

conn = psycopg2.connect(
        host="drhscit.org",
        database=os.environ['DB'],
        user=os.environ['DB_UN'],
        password=os.environ['DB_PW'])

cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS scouting_report;')

cur.execute('CREATE TABLE scouting_report (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,'
                                 'team TEXT NOT NULL,'
                                 'playstyle TEXT,'
                                 'corners TEXT,'
                                 'players_to_watch TEXT,'
                                 'goalkeeper TEXT,'                                 
                                 'team_notes TEXT,'
                                 'roster TEXT,'
                                 'date_added DATE DEFAULT CURRENT_DATE);'
                                 )
conn.commit()

cur.close()
conn.close()
