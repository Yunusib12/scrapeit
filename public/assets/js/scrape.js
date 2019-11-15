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

    function deleteNote(noteObj) {

        $.ajax({
            method: "DELETE",
            url: "/api/delete/note",
            data: noteObj
        }).then((datas) => {

            let noteChildrenCount = 0;
            let $noteList = $(`#noteList${noteObj.articleId}`);

            $(`#note${noteObj.noteId}`).remove();

            $noteList.children().each((index, element) => {
                noteChildrenCount++;
            })

            if (noteChildrenCount === 0) {

                const divNote = $("<div>").addClass("col-md-12 text-center text-danger");
                const pNote = $("<h5>").text("No notes for this article yet.");

                pNote.appendTo(divNote);
                divNote.appendTo($noteList);
            }
        });
    }

    function saveNote(noteObj) {

        $.ajax({
            method: "PUT",
            url: "/api/save/note",
            data: noteObj
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

    function errorMessage(message, articleId) {

        const divErrorMsg = $(`#divErrorMsg${articleId}`);

        $(`#errorMessage${articleId}`)
            .text(message)
            .addClass("text-danger")
            .appendTo(divErrorMsg);

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


    $(".btnSaveNote").on("click", function (event) {

        event.preventDefault();

        const articleId = $(event.currentTarget).attr("data-id");
        const noteText = $(`#notestext${articleId}`).val().trim();
        let noteObj = {};

        if (noteText !== "") {

            noteObj = {
                id: articleId,
                text: noteText
            }

            saveNote(noteObj)

        } else {

            errorMessage("Please write something!", articleId);
        }





    });


    $(".btnViewAddNote").on("click", function () {

        const modalId = $(this).attr("data-id");

        $(`#${modalId}`).modal('show');

    });


    $(".deleteNote").on("click", function () {

        event.preventDefault();

        const noteObj = {
            noteId: $(this).attr("data-note-id"),
            articleId: $(this).attr("data-article-id")
        }

        deleteNote(noteObj);



    });

});