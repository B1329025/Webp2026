// 1. 定義 API 網址 (文化部展覽資訊)
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

function addNewData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', openUrl, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        // 判斷請求是否成功完成 (readyState 4 且 status 200)
        if (this.readyState == 4 && this.status == 200) {
            // 將 JSON 字串轉為物件陣列
            var dataset = JSON.parse(this.responseText);
            displayData(dataset);
        }
    };
}

// 2. 將資料渲染至表格
function displayData(dataset) {
    var myTable = document.getElementById("csie").getElementsByTagName('tbody')[0];
    
    // 清空舊資料（避免重複點擊時重複堆疊）
    myTable.innerHTML = "";

    dataset.forEach(function(data) {
        // 插入新的一列
        var row = myTable.insertRow(-1);
        
        // 插入單元格並填入對應欄位
        // 名稱：data.title
        row.insertCell(0).innerHTML = data['title'];
        
        // 地點：data.showInfo[0].location (需注意 showInfo 是陣列)
        if (data['showInfo'] && data['showInfo'].length > 0) {
            row.insertCell(1).innerHTML = data['showInfo'][0]['location'];
            row.insertCell(2).innerHTML = data['showInfo'][0]['price'] || "免費";
        } else {
            row.insertCell(1).innerHTML = "無資訊";
            row.insertCell(2).innerHTML = "無資訊";
        }
    });
}

// 3. 清除舊資料的功能
function delOldData() {
    var myTable = document.getElementById("csie").getElementsByTagName('tbody')[0];
    myTable.innerHTML = "";
}