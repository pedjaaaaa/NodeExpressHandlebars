$(document).ready(function () {
    // Getting a reference to the input field where user adds a new burger
    var $newItemInput = $("#burgers");
    // New burgers will go inside the burgerContainer
    var $burgerContainer = $(".burger-container");
    // Finished burgers will go inside the devouredContainer
    var $devouredContainer = $(".devoured-container");
    // Adding event listeners for adding burgers
    $(document).on("click", "button.delete", devouredBurger);
    $(document).on("click", "button.insert", insertBurger);

    // Initial burgers array
    var burgers = [];

    // Getting burgers from database when page loads
    getBurgers();

    // This function resets the burgers displayed with new burgers from the database
    function initializeRows() {
        $burgerContainer.empty();
        $devouredContainer.empty();
        var uneatenBurgers = [];
        var devouredBurgers = [];
        for (let i = 0; i < burgers.length; i++) {
            if (burgers[i].devour === true) {
                devouredBurgers.push(createDevourRow(burgers[i]))
            } else {
                uneatenBurgers.push(createNewRow(burgers[i]));
            }
        }
        $burgerContainer.append(uneatenBurgers);
        $devouredContainer.append(devouredBurgers);
    }
    // This function grabs burgers from the database and updates the view
    function getBurgers() {
        $.get("/api/burgers", function (data) {
            burgers = data;
            initializeRows();
        });
    }

    // This function updates a burger to 'devour: true' when the user clicks the devour button
    function devouredBurger(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
            method: "PUT",
            url: "/api/burgers/" + id,
            data: {"devour": true}
        }).then(getBurgers)
    }

    // This function constructs a burger-item row
    function createNewRow(burger) {
        var $newInputRow = $(
            [
                "<li class='list-group-item burger-item'>",
                "<span>",
                burger.text,
                "</span>",
                "<input type='text' style='display: none;'>",
                "<button class='delete btn btn-danger'>Devour</button>",
                "</li>"
            ].join("")
        );

        $newInputRow.find("button.delete").data("id", burger.id);
        $newInputRow.data("burger", burger);
        return $newInputRow;
    }

    function createDevourRow(burger) {
        var $newDevourRow = $(
            [
                "<li class='list-group-item devour-item' style='background: grey; color: white; border-color: white'>",
                "<span>",
                burger.text,
                "</span>",
                "<input type='text' style='display: none;>",
                "</li>"
            ].join("")
        );
        $newDevourRow.data("burger", burger);
        return $newDevourRow;
    }

    function insertBurger(event) {
        event.preventDefault();
        var burger = {
            text: $newItemInput.val().trim(),
            devour: false
        };

        $.post("/api/burgers", burger, getBurgers);
        $newItemInput.val("");
    }
});