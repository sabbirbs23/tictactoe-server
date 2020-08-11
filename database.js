const DB = "tictactoe.sqlite";
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DB);

db.serialize(function() {
    console.log('Connected to the SQlite database.');
    db.run(`CREATE TABLE game (id TEXT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`,(err) => {
        console.log('Game table already created');
    });
    db.run(`CREATE TABLE gameHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, gameId TEXT , value TEXT, gridNumber INTEGER)`,(err) => {
        console.log('GameHistory already created');
    });
});

module.exports = db;
