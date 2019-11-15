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

                const pNote = $("<h4>").text("No Note available for this article");

                $noteList.append(pNote);
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

        const noteObj = {
            id: articleId,
            text: $(`#notestext${articleId}`).val().trim()
        }

        saveNote(noteObj);

        console.log(noteObj);
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