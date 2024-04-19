# [live page](https://0ddsh33p.github.io/SoccerStats)

## User documentation

### Signing in and user creation
Signing in is as simple as typing in either the provided admin username and password or by entering a created student account into the boxes provided on the sign in page.
Creating a new user can only be done through an admin account. To do so, sign in with the admin account and navigate to the "add user" tab on the nav bar, then type in the new user's desired name, password, and password double check. Before hitting "add user" ensure any desired limits have been added to the user under the viewable option. Hitting add user will create the account and allow the user and password now access the information allowed.

- THIS FETURE IS NOT CONNECTED TO THE REST OF THE SITE AND IS NOT ENFORCED AT THIS TIME. 

### Loading the database
to launch the database, please download python and install the flask and cors libraries. They download the database accesor.py from the data folder, and launch it. there should be a terminal that says something like localhost running on port..., This means everything worked. To re open the database, just launch the python file, all updates are saved automatically, note, right now only the computer that the database file has the information about the games and other devices won't be able to access it.

### Starting a game
Please note, THIS PAGE MUST BE LOADED WHILE CONNECTED TO WIFI WITH THE DATABASE once loaded it can be edited offline. Start by signing in and navigating to the "new game" tab. Here a popup will be shown with options for teams (set up in the teams page), location and basic info. Continue with this page open to edit any stats during a game. Once the game has completed DO NOT HIT PUSH GAME TO DATABASE WITHOUT BEING CONNECTED TO WIFI AND THE DATABASE, once you have returned to wifi and connect to the database, then push the data so that other users can sync to it.
Please note, only stats specified to be tracked in the settings page will be available in the game. These stats will exist forever after being added once.


### Additional info
to view a past game, navigate to the HOME page on the site. here you can click on a game to load the stats and specific entries from a game. Unfortunately The project team did not have time to add player specific information or team specific information, and the sign in is not fully functional, hopefully these feature can be implemented next year!
