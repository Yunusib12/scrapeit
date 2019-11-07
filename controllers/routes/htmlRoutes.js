const
    router = require('express').Router(),
    db = require("../../models");

router.get("/", (req, res) => {

    let headlineObject = {}

    headlineObject["articles"] = []

    db.article
        .find({ $and: [{ saved: false }, { deleted: false }] })
        .sort({ date: -1 })
        .then((dbarticles) => {

            res.render("index", {
                dbarticles
            });
        });

});




module.exports = router;