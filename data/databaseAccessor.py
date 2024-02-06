import sqlite3

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
    )
''')

# Commit the changes
connection.commit()
