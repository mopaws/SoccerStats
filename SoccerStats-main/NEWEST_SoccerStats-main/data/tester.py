import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
import os

conn = sqlite3.connect('Soccer.db')

c1 = conn.cursor()
c2 = conn.cursor()
c3 = conn.cursor()

d = c1.execute('SELECT name FROM sqlite_master where type = \'table\'');

for data in d:

  print(data[0])

  stmt = 'SELECT name FROM pragma_table_info(\'' + data[0] + '\') ORDER BY cid'

  print (stmt)

  c2.execute(stmt)

  cdata = c2.fetchall()

  print (cdata)

  c3.execute ('select * from ' + data[0])

  d3 = c3.fetchall()

  for td in d3:

    print(td)