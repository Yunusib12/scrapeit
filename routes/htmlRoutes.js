const
    router = require('express').Router(),
    db = require("../models");

router.get("/", (req, res) => {

    db.Article
        .find({ $and: [{ saved: false }, { deleted: false }] })
        .sort({ date: -1 })
        .then((articles) => {

            res.render("index", {
                articles
            });
        });

});

router.get("/saved", (req, res) => {

    db.Article
        .find({ $and: [{ saved: true }, { deleted: false }] })
        .sort({ date: -1 })
        .populate("note")
        .then((articles) => {

            const hbsObject = {
                articles: articles,
                saved: true
            };

            res.render("index", hbsObject);
        });

});



module.exports = router;