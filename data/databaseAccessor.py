import sqlite3
import flask

# Create the application.
APP = flask.Flask(__name__)


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
print(rows)

# Commit the changes
connection.commit()

@APP.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    return jsonify(rows)


if __name__ == '__main__':
    APP.debug=True
    APP.run()
