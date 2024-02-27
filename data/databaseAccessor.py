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

# Execute SQL commands
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        name TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        admin BOOLEAN);
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
        name VARCHAR(50),
        notes VARCHAR(1000)
        );
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS trackedStatistics (
        statID INT NOT NULL,
        gameID INT NOT NULL,
        playerID INT NOT NULL,
        numberOf INT
        );
''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS statisticTypes (
        statID INTEGER PRIMARY KEY AUTOINCREMENT,
        statName VARCHAR(50)
        );
''')


# Commit the changes
connection.commit()
connection.close()

@APP.route('/getUser/<name>/<password>')
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
        return jsonify({'bad': True})
    except:
        print("faild to retrive data")
        return jsonify({'error': False})

@APP.route('/addUser/<name>/<password>')
def addUser(name, password):
    try:
        connection = sqlite3.connect('Soccer.db')
        # Create a cursor object
        cursor = connection.cursor()

        cursor.execute("INSERT INTO users (name, password) VALUES (?, ?)", (name, password))
        connection.commit()
        connection.close()
        return jsonify({'inserted data': True})
    except:
        print("faild to insert data")
        return jsonify({'failed to insert data': False})
    


if __name__ == '__main__':
    APP.debug=True
    APP.run()
