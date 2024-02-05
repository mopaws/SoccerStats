const initSqlJs = window.initSqlJs;

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: file => `https://sql.js.org/dist/${file}`
});

// Create a database
const db = new SQL.Database();

// Execute a single SQL string that contains multiple statements
let sqlstr = "CREATE TABLE testData (a int, b char); \
INSERT INTO testData VALUES (0, 'hello'); \
INSERT INTO testData VALUES (1, 'world');";
db.run(sqlstr);
