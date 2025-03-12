import os
import psycopg2
from psycopg2 import sql
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import os

# Load environment variables from .env
load_dotenv()

# Get the encryption key from .env (now using 'KEY')
encryption_key = os.getenv("KEY")
# Check if encryption_key is loaded correctly
if encryption_key is None:
    raise ValueError("Encryption key not found in .env file.")

cipher_suite = Fernet(encryption_key.encode())

# Decrypt the password (as an example)
encrypted_password = os.getenv("PG_PASSWORD")
if encrypted_password is None:
    raise ValueError("Encrypted password not found in .env file.")

DB_PASSWORD = cipher_suite.decrypt(encrypted_password.encode()).decode()

# Retrieve other database credentials
DB_NAME = os.getenv("PG_DBNAME")
DB_USER = os.getenv("PG_USER")
DB_HOST = os.getenv("PG_HOST")
DB_PORT = os.getenv("PG_PORT")

# Create the Flask application
APP = Flask(__name__)
CORS(APP)

# Function to get a database connection
def get_db_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,  # Use the decrypted password
        host=DB_HOST,
        port=DB_PORT
    )

# Initialize tables in PostgreSQL
def init_db():
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS users (
                    name TEXT PRIMARY KEY,
                    password TEXT NOT NULL,
                    admin BOOLEAN
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS game (
                    gameID SERIAL PRIMARY KEY,
                    dateOfGame DATE NOT NULL,
                    opponent VARCHAR(50) NOT NULL,
                    homeGame BOOLEAN NOT NULL,
                    varsity BOOLEAN,
                    outcome INT,
                    gameConditions VARCHAR(500),
                    notes VARCHAR(1000)
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS player (
                    playerID SERIAL PRIMARY KEY,
                    name VARCHAR(25) NOT NULL,
                    teamName VARCHAR(50),
                    gradeLevel INT,
                    jerseyNumber INT NOT NULL,
                    positionsPlayed VARCHAR(100) NOT NULL,
                    notes VARCHAR(1000)
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS opponent (
                    OppID SERIAL PRIMARY KEY,
                    teamName VARCHAR(50),
                    notes VARCHAR(1000)
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS team (
                    teamID SERIAL PRIMARY KEY,
                    name VARCHAR(50) NOT NULL UNIQUE,
                    year VARCHAR(50) NOT NULL UNIQUE,
                    notes VARCHAR(1000)
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS trackedStatistics (
                    instanceID SERIAL PRIMARY KEY,
                    statID INT NOT NULL,
                    gameID INT NOT NULL,
                    numberOf INT,
                    playerID INT,
                    notes VARCHAR(667)
                );
            ''')

            cursor.execute(''' 
                CREATE TABLE IF NOT EXISTS statisticTypes (
                    statID SERIAL PRIMARY KEY,
                    statName VARCHAR(50) NOT NULL UNIQUE,
                    tPlayer BOOLEAN,
                    tNotes BOOLEAN
                );
            ''')

        conn.commit()

# Route to check if a user exists
@APP.route('/getUser/<name>/<password>')
def getUser(name, password):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE name = %s AND password = %s", (name, password))
                user = cursor.fetchone()
        return jsonify({'good': bool(user)})
    except Exception as e:
        print("Error:", e)
        return jsonify({'good': False})

# Route to add a user
@APP.route('/addUser/<name>/<password>')
def addUser(name, password):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("INSERT INTO users (name, password) VALUES (%s, %s)", (name, password))
            conn.commit()
        return jsonify({'data': True})
    except Exception as e:
        print("Error:", e)
        return jsonify({'data': False})

# Route to add a general stat
@APP.route('/addGeneralStat/<int:stat>/<int:game>/<int:num>/<int:player>/<note>')
def addGeneralStat(stat, game, num, player, note):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO trackedStatistics (statID, gameID, numberOf, playerID, notes) VALUES (%s, %s, %s, %s, %s)",
                    (stat, game, num, player, note)
                )
            conn.commit()
        return jsonify({'data': True})
    except Exception as e:
        print("Error:", e)
        return jsonify({'data': False})

# Route to fetch all stats for a game
@APP.route('/fetchStats/<int:game>')
def fetchAllStats(game):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(''' 
                    SELECT *, SUM(numberOf)
                    FROM statisticTypes AS types
                    LEFT JOIN trackedStatistics AS stats ON stats.statID = types.statID
                    WHERE gameID = %s
                    GROUP BY types.statID
                ''', (game,))
                rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        print("Error:", e)
        return jsonify({'fetched': False})

# Route to fetch all games
@APP.route('/getGames')
def getGames():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('SELECT * FROM game ORDER BY gameID DESC')
                rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        print("Error:", e)
        return jsonify({'fetched': False})

if __name__ == '__main__':
    init_db()  # Initialize the database tables
    APP.run(debug=True)
