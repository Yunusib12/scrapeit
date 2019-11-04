$(() => {

    $(".btnHome").on("click", function () {


        location.href = "/";

    });

    $(".btnSaved").on("click", function () {


        location.href = "/saved";

    });

    $(".btnScrape").on("click", function () {


        location.href = "/api/scrape";

    });

});