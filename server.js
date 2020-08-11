var express = require("express");
var app = express();
var db = require("./database.js");
var uuid = require('uuid');
var cors = require('cors');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});

app.post("/api/create-game/", (req, res, next) => {
    const gameId = uuid.v4();
    var sql ='INSERT INTO game (id) VALUES (?)';
    var params =[gameId];
    db.run(sql, params, (err) => {
        if (err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": {
                gameId,
            },
        })
    });
});


app.get("/api/game-history/:id", (req, res, next) => {
    var sql = "select * from gameHistory where gameId = ?";
    var params = [req.params.id];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});


app.post("/api/save-history/", (req, res, next) => {
    var errors=[];
    if (!req.body.gameId){
        errors.push("No password specified");
    }
    if (!req.body.value){
        errors.push("No email specified");
    }
    if (errors.gridNumber){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        gameId: req.body.gameId,
        value: req.body.value,
        gridNumber : req.body.gridNumber,
    };
    var sql ='INSERT INTO gameHistory (gameId, value, gridNumber) VALUES (?,?,?)'
    var params =[data.gameId, data.value, data.gridNumber];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


module.exports = app;
