# [live page](https://0ddsh33p.github.io/SoccerStats)

## backend documentation

### Adding data to the database
adding data to the database has been partially set up, but more methods are to come, se the following for deatils on current methods

> the method tryCreateUser() is used to create a new user. It takes no parameters, but looks for 3 fields whith IDs: newName, newPass, confPass
> the name is the username, the pass is the password, and confpass is used to confirm the password was typed correcty (re-enter password)

> the funtion addData() creates a data entry into the trackedstatistics table. it takes 3 or 4 paramaters: statID, gameID, numberOf, and optionally playerID
> the statID, gameID, and number of refrance the game and specific stat that was added, the number of is how many of the stat were done **THIS SHOULD BE SET TO 1 IN MOST CASES** as it creates a new entry for each score, it does not update and existing entry, so adding more than 1 means that that number of stat were done at once.
