var todoData = [
    {
        id: uuid(),
        content: "aaa",
        createdAt: 34253442
    },
    {
        id: uuid(),
        content: "bbb",
        createdAt: 235435
    }
];

var errorMsgData = "";

function renderErr(){
    //render err
    var $errorMsg = $("#errorMsg");
    var $addTodoInput = $("#addTodoInput");

    $errorMsg.text("");   

    $errorMsg.append(errorMsgData);

    $addTodoInput.val("");
    errorMsgData = "";
}

// 讀取資料
function render(todoData){

    var $addTodoInput = $("#addTodoInput");
    var $errorMsg = $("#errorMsg");

    
    // render ul
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
    $errorMsg.text("");

    $ul.append(HTML);

    
    $addTodoInput.val(""); 
    errorMsgData = "";
};


function validate(newTodoText){
    var isValid = true;

    // 第一關，驗證是否空值，若是則把isValid改成false
    if(!newTodoText){
        isValid = false;
        errorMsgData = "請輸入內容";
    }

    // 第二關，驗證是否重複，若是則把isValid改成false
    for(var i = 0; i < todoData.length; i++){
        if(todoData[i].content === newTodoText){
            isValid = false;
            errorMsgData = "輸入的值已存在";
        };
    };

    return isValid;
};

render(todoData);


// 寫入資料
$("#addTodoBtn").on("click", function(event){
    event.preventDefault();
    var $addTodoInput = $("#addTodoInput");
    var newTodoText = $addTodoInput.val().trim();

    var isValid = validate(newTodoText);
    if(!isValid){
        renderErr();
        return;
    }

    // 把使用者輸入的資料存進todoData
    var newTodoData = {
        id: uuid(),
        content: newTodoText,
        createdAt: moment().valueOf()
    };


    todoData.push(newTodoData);

    // 再次render todoData
    render(todoData);
    
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