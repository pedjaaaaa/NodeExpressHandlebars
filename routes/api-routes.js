var db = require("../models");

module.exports = function (app) {
    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({}).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });

    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            text: req.body.text,
            devour: req.body.devour
        }).then(function (dbBurger) {
            res.json(dbBurger)
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update({
            devour: req.body.devour
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbBurger) {
                res.json(dbBurger)
            });
    });
};