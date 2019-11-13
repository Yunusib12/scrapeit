$(() => {

    /* Functions
    ================================== */

    function saveArticle(articleId) {

        $.ajax({
            method: "PUT",
            url: "/api/save/article",
            data: { id: articleId }
        }).then((datas) => {

            location.reload();
        });
    }

    function deleteArticle(articleId) {

        $.ajax({
            method: "PUT",
            url: "/api/delete/article",
            data: { id: articleId }
        }).then((datas) => {

            location.reload();
        });
    }

    function scrapeIt() {

        $.get("/api/scrape")
            .then((datas) => {

                location.reload();
            });
    }


    /*
    ======================================= */

    /* Events
    ================================== */

    $(".btnHome").on("click", function (event) {


        location.href = "/";

    });

    $(".btnSaved").on("click", function (event) {

        event.preventDefault();

        location.href = "/saved";


    });

    $(".btnScrape").on("click", function () {

        // location.href = "/api/scrape";
        scrapeIt();

        location.href = "/";
    });

    $(".btnsaveArticle").on("click", function (event) {

        event.preventDefault();

        const article = $(event.currentTarget).attr("data-id");

        saveArticle(article);
    });


    $(".btnDeleteArticle").on("click", function (event) {
        event.preventDefault();

        const article = $(event.currentTarget).attr("data-id");

        deleteArticle(article);
    });


    $(".btnViewAddNote").on("click", function (event) {
        // $('.modal').modal();

        event.preventDefault();

        const article = $(event.currentTarget).attr("data-id");

        console.log("view", article);

    });

});