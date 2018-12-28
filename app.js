var todoData = [
];

// 讀取資料
function render(todoData){
    // 把資料渲染到螢幕上
    var $ul = $("ul");
    var HTML = "";    

    for(var i = 0; i < todoData.length; i++){
        HTML = HTML + `
        <li id="${todoData[i].id}">
            <span class="delete">
                刪除
            </span>
            ${todoData[i].content}
            ${moment(todoData[i].createdAt).format("MM/DD hh:mm")}
        </li>`;
    };

    // 清空畫面
    $("ul").empty();

    $ul.append(HTML);

};

render(todoData);


// 寫入資料
$("#addTodoBtn").on("click", function(event){
    event.preventDefault();
    var $addTodoInput = $("#addTodoInput");
    var newTodoText = $addTodoInput.val().trim();

    // 如果使用者啥都沒輸入
    if(!newTodoText) return;

    // 把使用者輸入的資料存進todoData
    var newTodoData = {
        id: uuid(),
        content: newTodoText,
        createdAt: moment().valueOf()
    };


    todoData.push(newTodoData);

    // 再次render todoData
    render(todoData);


    // $("ul").append(`<li><span class="delete">刪除</span>${newTodoText}${moment().format("MM/DD hh:mm")}</li>`);

    $addTodoInput.val("");
});


$("ul").on("click", ".delete", function(){
    // 先刪掉資料庫裡的資料
    var idToDelete = $(this).parent("li").attr("id");
    
    todoData = todoData.filter(function(todo){
        if(todo.id === idToDelete) return false;
        else return true;        
    });

    // 重新rander一次
    render(todoData);

});