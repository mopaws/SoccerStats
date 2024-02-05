var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
  tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
});

tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
  var len = results.rows.length, i;
  for (i = 0; i < len; i++) {
    alert(results.rows.item(i).text);
  }
});
