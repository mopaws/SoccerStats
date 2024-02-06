from flask import Flask, render_template
import sqlite3

app = Flask(__name__)
# Connect to the database (creates a new file if it doesn't exist)
connection = sqlite3.connect('Scoccer.db')

# Create a cursor object
cursor = connection.cursor()

# Execute SQL commands
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        name TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        admin BOOLEAN DEFAULT false
    );
''')

cursor.execute('INSERT INTO users VALUES("Random","passwordHEHEHE");')

# Fetch all rows as a list of tuples
rows = cursor.fetchall()

# Commit the changes
connection.commit()
