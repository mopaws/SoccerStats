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

# Fetch all rows as a list of tuples
cursor.execute("SELECT * FROM users")

rows = cursor.fetchall()

# Commit the changes
connection.commit()

@APP.route('/getData')
def index():
    """ Displays the index page accessible at '/'
    """
    return jsonify(rows)


if __name__ == '__main__':
    APP.debug=True
    APP.run()
