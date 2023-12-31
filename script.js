$(document).ready(function () {
    $("#addTaskBtn").click(function () {
        addTaskWithAnimation();
    });

    $("#list-container").on("click", "li", function () {
        toggleTaskCompletion($(this));
        if ($(this).hasClass("checked")) {
            moveTaskToBottom($(this));
        } else {
            moveTaskToTop($(this));
        }
        moveOtherTasksUp();
        saveData();
    });

    $("#list-container").on("click", "span", function () {
        removeTaskWithAnimation($(this).parent());
        saveData();
    });

    showTask();
});

function addTaskWithAnimation() {
    var inputBox = $("#input-box");
    var listContainer = $("#list-container");

    if (inputBox.val() === '') {
        alert("You must write something!");
        inputBox.css("border", "2px solid red");
    } else {
        var li = $("<li>").html(inputBox.val());
        li.append('<span>\u00d7</span>');
        if ($("#list-container").children(".checked").length > 0) {
            li.insertBefore($("#list-container").children(".checked").first());
        } else {
            listContainer.append(li);
        }
        li.hide().fadeIn(500);
    }

    inputBox.val("");
    saveData();
}

function toggleTaskCompletion(task) {
    task.toggleClass("checked");
}

function moveTaskToTop(task) {
    task.fadeOut(500, function () {
        $(this).insertBefore($("#list-container").children(".checked").first()).removeAttr("style").fadeIn(500);
    });
}

function moveTaskToBottom(task) {
    task.fadeOut(500, function () {
        $(this).appendTo("#list-container").removeAttr("style").fadeIn(500);
    });
}

function moveOtherTasksUp() {
    $(".checked").each(function () {
        $(this).animate({
            opacity: "toggle",
            height: "toggle"
        }, 500, function () {
            $(this).insertBefore($("#list-container").children(".checked").first()).removeAttr("style").fadeIn(500);
        });
    });
}

function removeTaskWithAnimation(task) {
    task.fadeOut(500, function () {
        if ($(this).hasClass("checked")) {
            $(this).appendTo("#list-container").removeAttr("style").fadeIn(500);
        }
        $(this).remove();
    });
}

function saveData() {
    localStorage.setItem("data", $("#list-container").html());
}

function showTask() {
    $("#list-container").html(localStorage.getItem("data"));
}
