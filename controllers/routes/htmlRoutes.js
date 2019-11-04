const
    router = require('express').Router(),
    db = require("../../models");

router.get("/", (req, res) => {

    let headlineObject = {}

    headlineObject["articles"] = []

    db.article
        .find({})
        .sort({ date: -1 })
        .then((found) => {

            found.length > 0 ? found.forEach((elem) => {

                let hbsObjet = {
                    id: elem._id,
                    headline: elem.headline,
                    summary: elem.summary,
                    link: elem.link,
                    photo: elem.photo,
                    saved: elem.saved,
                    notes: elem.notes
                }

                headlineObject.articles.push(hbsObjet);

                (elem === (found.length - 1)) && res.render("index", hbsObjet)
            })
                :

                res.render("index");
        });

});




module.exports = router;