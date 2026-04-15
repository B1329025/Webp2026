// 變數設定
const API_URL = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
let allData = [];      // 原始資料
let filteredData = []; // 搜尋後的資料
let currentPage = 1;   // 目前頁碼
const rowsPerPage = 10; // 每頁筆數

// 選取 DOM 元素
const btnFetch = document.getElementById('btnFetch');
const btnClear = document.getElementById('btnClear');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const searchInput = document.getElementById('searchName');
const tableBody = document.querySelector("#csie tbody");

// --- 事件監聽 (Event Listeners) ---

// 點擊載入
btnFetch.addEventListener('click', fetchData);

// 點擊清空
btnClear.addEventListener('click', clearData);

// 搜尋輸入 (即時反應)
searchInput.addEventListener('input', handleSearch);

// 分頁按鈕
btnPrev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

btnNext.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

// --- 功能函式 (Functions) ---

// AJAX 抓取
function fetchData() {
    tableBody.innerHTML = "<tr><td colspan='3' class='text-center'>資料載入中...</td></tr>";
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            allData = JSON.parse(this.responseText);
            filteredData = allData;
            currentPage = 1;
            renderTable();
        }
    };
}

// 渲染表格
function renderTable() {
    tableBody.innerHTML = "";

    if (filteredData.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3' class='text-center'>查無資料</td></tr>";
        updateUI(0, 0);
        return;
    }

    // 分頁切片
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pagedData = filteredData.slice(start, end);

    pagedData.forEach(item => {
        const row = tableBody.insertRow(-1);
        row.insertCell(0).innerText = item.title;
        
        const info = item.showInfo && item.showInfo[0];
        row.insertCell(1).innerText = info ? info.location : "無資訊";
        row.insertCell(2).innerText = info ? info.price : "無資訊";
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    updateUI(currentPage, totalPages);
}

// 搜尋處理
function handleSearch() {
    const keyword = searchInput.value.toLowerCase();
    filteredData = allData.filter(item => 
        item.title.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderTable();
}

// 更新分頁介面
function updateUI(current, total) {
    document.getElementById("currentPage").innerText = current;
    document.getElementById("totalPages").innerText = total;
    btnPrev.disabled = (current <= 1);
    btnNext.disabled = (current >= total || total === 0);
}

// 清空
function clearData() {
    allData = [];
    filteredData = [];
    currentPage = 1;
    searchInput.value = "";
    renderTable();
}