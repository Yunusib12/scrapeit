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

                (error) ? console.log("Article already exists: " + headlineObject.title) : console.log("New article: " + headlineObject.title);

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



module.exports = router;