const
    router = require('express').Router(),
    axios = require("axios"),
    cheerio = require("cheerio")
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

            // Adding articles in the articles tables 
            db.article.create(headlineObject).then((dbArticle) => {
                // View the added result in the console
                console.log(dbArticle);
            }).then((dbArticle) => {

                res.json(dbArticle);

            }).catch(function (err) {
                // If an error occurred, log it
                console.log(err);
            });

        });

    }).catch(function (error) {
        console.log(error);
    });

});

router.put("/save/article", (req, res) => {

    const { articleId } = req.body.id;




});







module.exports = router;