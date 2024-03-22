import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

# Create the application.
APP = Flask(__name__)
CORS(APP)

# Connect to the database (creates a new file if it doesn't exist)
connection = sqlite3.connect('Soccer.db')

# Create a cursor object
cursor = connection.cursor()

# Create all the tables if the database doesn't already contain them
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        name TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        admin BOOLEAN
    );
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS game (
        gameID INTEGER PRIMARY KEY AUTOINCREMENT,
        dateOfGame DATE NOT NULL,
        opponent VARCHAR(50) NOT NULL,
        homeGame BOOL NOT NULL,
        varsity BOOL NOT NULL,
        homePoints INT,
        opponentPoints INT,
        outcome INT NOT NULL,
        gameConditions VARCHAR(500),
        notes VARCHAR(1000)
    );
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS player (
        playerID INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(25) NOT NULL,
        teamName VARCHAR(50),
        gradeLevel INT,
        jerseyNumber INT NOT NULL,
        positionsPlayed VARCHAR(100) NOT NULL,
        notes VARCHAR(1000)
    );
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS team (
        name VARCHAR(50) NOT NULL UNIQUE,
        notes VARCHAR(1000)
    );
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS trackedStatistics (
        statID INT NOT NULL,
        gameID INT NOT NULL,
        playerID INT,
        numberOf INT
    );
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS statisticTypes (
        statID INTEGER PRIMARY KEY AUTOINCREMENT,
        statName VARCHAR(50) NOT NULL UNIQUE,
        tPlayer BOOLEAN
    );
''')


# Commit the tables to the database and cut off connection to stay secure. 
connection.commit()
connection.close()


#take in a name and password and check if they exist in the database, return true if so, false elswise
@APP.route('/getUser/<name>/<password>') # define the url ending to access method
def getUser(name, password):
    try:
        connection = sqlite3.connect('Soccer.db')
        # Create a cursor object
        cursor = connection.cursor()
        # Fetch all rows as a list of tuples and close the connection
        cursor.execute("SELECT * FROM users")
        userData = cursor.fetchall()
        connection.commit()
        connection.close()
        #iterate over all returned users and check their names and passwords on the server
        for x in userData:
            #if there is a match, return a positive result
            if x[0] == name and x[1] == password:
                return jsonify({'good': True})
            #otherwise return false if the input was bad or the user isn't in the directory
        return jsonify({'good': False})
    except:
        connection.close()
        return jsonify({'good': False})

#adds a user to the users table in the database
@APP.route('/addUser/<name>/<password>')#url with 2 paramaters
def addUser(name, password):
    try:
        #connect to the database
        connection = sqlite3.connect('Soccer.db')
        # Create a cursor object
        cursor = connection.cursor()

        #inert the data into the table using a sql command
        cursor.execute("INSERT INTO users (name, password) VALUES (?, ?)", (name, password))
        connection.commit()
        connection.close()
        #after closing the connection, if nothing has gone bad, return a positive result
        return jsonify({'data': True})
    except:
        # if anything broke, return a false result
        connection.close()
        return jsonify({'data': False})


@APP.route('/addGeneralStat/<int:stat>/<int:game>/<int:num>')
def addGeneralStat(stat, game, num):
    try:
        connection = sqlite3.connect('Soccer.db')
        # Create a cursor object
        cursor = connection.cursor()

        cursor.execute("INSERT INTO trackedStatistics (statID, gameID, numberOf) VALUES (?, ?, ?)", (stat, game, num))
        connection.commit()
        connection.close()
        return jsonify({'data': True})
    except:
        connection.close()
        return jsonify({'data': False})

@APP.route('/addPlayerStat/<int:stat>/<int:game>/<int:num>/<int:player>')
def addPlayerStat(stat, game, num, player):
    try:
        connection = sqlite3.connect('Soccer.db')
        # Create a cursor object
        cursor = connection.cursor()

        cursor.execute("INSERT INTO trackedStatistics (statID, gameID, playerID, numberOf) VALUES (?, ?, ?, ?)", (stat, game, player, num))
        connection.commit()
        connection.close()
        return jsonify({'data': True})
    except:
        connection.close()
        return jsonify({'data': False})
    
@APP.route('/fetchStats')
def fechAllStats():
    try:
        connection = sqlite3.connect('Soccer.db')
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM statisticTypes As types LEFT JOIN trackedStatistics As stats ON stats.statID == types.statID')
        rows = cursor.fetchall()
        connection.commit()
        connection.close()
        return jsonify(rows)
    except:
        connection.close()
        return jsonify({'feched': False})

@APP.route('/newStat/<name>/<player>')
def addNewStat(name,player):
    try:
        connection = sqlite3.connect('Soccer.db')
        cursor = connection.cursor()

        # Check if the statistic type already exists
        cursor.execute('SELECT * FROM statisticTypes WHERE statName=? AND tPlayer=?', (name, player))
        existing_stat = cursor.fetchone()

        if existing_stat:
            return jsonify({'added': False, 'message': 'Statistic type already exists.'})

        # Insert new statistic type
        cursor.execute('''
            INSERT INTO statisticTypes (statName, tPlayer)
            VALUES (?, ?)
        ''', (name, player))

        connection.commit()
        connection.close()
        return jsonify({'added': True})
    except sqlite3.Error as e:
        print("Error:", e)
        connection.close()
        return jsonify({'added': False, 'message': 'Database error.'})

@APP.route('/stats')
def stats():
    try:
        connection = sqlite3.connect('Soccer.db')
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM statisticTypes')
        rows = cursor.fetchall()
        connection.commit()
        connection.close()
        return jsonify(rows)
    except:
        connection.close()
        return jsonify({'feched': False})
    
@APP.route('/removeStat/<int:id>')
def remStat(id):
    try:
        connection = sqlite3.connect('Soccer.db')
        cursor = connection.cursor()

        cursor.execute('DELETE FROM statisticTypes WHERE statID=?', (id,))
        connection.commit()
        connection.close()
        return jsonify({'removed': True})
    except:
        connection.close()
        return jsonify({'removed': False})

if __name__ == '__main__':
    APP.debug=True
    APP.run()
