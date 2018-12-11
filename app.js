$("#addTodoBtn").on("click", function(event){
    event.preventDefault();
    var $addTodoInput = $("#addTodoInput");
    var newTodoText = $addTodoInput.val();

    // 如果使用者啥都沒輸入
    if(!newTodoText) return;

    $("ul").append(`<li>${newTodoText}   ${moment().format("MM/DD hh:mm")}</li>`);

    $addTodoInput.val("");
});

