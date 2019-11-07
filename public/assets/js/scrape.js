$(() => {

    /* Functions
    ================================== */

    function saveArticle(articleId) {

        $.ajax({
            method: "PUT",
            url: "/api/save/article",
            data: { id: articleId }
        }).then(() => {

            location.reload();
        });
    }

    $(".btnHome").on("click", function () {


        location.href = "/";

    });

    $(".btnSaved").on("click", function () {


        location.href = "/saved";

    });

    $(".btnScrape").on("click", function () {


        // location.href = "/api/scrape";



    });

    $(".btnsaveArticle").on("click", function (event) {

        event.preventDefault();

        let article = $(event.currentTarget).attr("data-id");

        console.log(article);
    });

});