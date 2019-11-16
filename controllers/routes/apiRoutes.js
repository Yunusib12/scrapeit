const
    router = require('express').Router(),
    axios = require("axios"),
    cheerio = require("cheerio"),
    db = require('../../models');


router.get("/scrape", (req, res) => {

    axios.get("https://www.npr.org/sections/news/").then((response) => {

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        console.log($("article.item").length);

        $("article.item").each(function (i, element) {

            const title = $(element).find('.item-info').find('.title').find('a').text();
            const summary = $(element).find('.item-info').find('.teaser').find('a').text();
            const link = $(element).find('.item-info').find('.title').children().attr("href");
            const photo = $(element).find('.item-image').find('.imagewrap').find('a').find('img').attr("src");
            const date = $(element).find('.item-info').find('.teaser').find('a').find('time').attr("datetime");

            let headlineObject = {
                title,
                summary,
                link,
                photo,
                date
            }

            db.Article.create(headlineObject, function (error) {

                (error) ? console.log(`Article already exists: ${headlineObject.title}`) : console.log(`New article: ${headlineObject.title}`);

                (i == ($("article.item").length - 1)) && res.json("scrape complete")

            });
        });

    }).catch(function (error) {
        console.log(error);
    });

});

router.put("/save/article", (req, res) => {

    const { id } = req.body;

    db.Article.findOneAndUpdate(
        { _id: id },
        {
            $set: { saved: true }
        }
    ).then(function (result) {

        res.json(result)
    });

});

router.put("/delete/article", (req, res) => {

    const { id } = req.body;

    console.log(id);

    db.Article.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                saved: false,
                deleted: true,
                notes: []
            }
        }
    ).then(function (result) {

        res.json(result)
    });

});

router.put("/save/note", (req, res) => {

    const { id, text } = req.body;
    console.log(req.body);
    db.Note.create({ text })
        .then(function (dbNote) {

            return db.Article.findOneAndUpdate({ _id: id }, { $push: { note: dbNote._id } }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
            console.log("save note");
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.delete("/delete/note", (req, res) => {

    const { articleId, noteId } = req.body;

    db.Note.deleteOne({ _id: noteId })
        .then(() => {

            return db.Article.findByIdAndUpdate(articleId, { $pull: { note: noteId } });
        })
        .then(() => {

            res.json({ status: 200 });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });



});


module.exports = router;