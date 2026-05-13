import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, Container } from '@mui/material';

const Data = () => {
  // --- 1. 狀態設定 (State) ---
  const [allData, setAllData] = useState([]);      // 原始資料儲存
  const [filteredData, setFilteredData] = useState([]); // 搜尋後的資料
  const [loading, setLoading] = useState(false);   // 載入狀態
  const [searchText, setSearchText] = useState(""); // 搜尋框文字

  // --- 2. 定義 DataGrid 欄位 (Columns) ---
  const columns = [
    { field: 'id', headerName: '序號', width: 90 },
    { field: 'title', headerName: '活動名稱', flex: 1 },
    { field: 'location', headerName: '地點', width: 250 },
    { field: 'price', headerName: '票價', width: 200 },
  ];

  // --- 3. 資料抓取邏輯 (useEffect) ---
  // 參考 image_56049e.png：使用 useEffect 呼叫 API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const API_URL = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
      
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        
        // 整理資料：將深層的 showInfo 提取出來，並加上 DataGrid 必備的 id
        const formattedData = json.map((item, index) => ({
          id: index + 1,
          title: item.title,
          location: item.showInfo?.[0]?.location || "無資訊",
          price: item.showInfo?.[0]?.price || "無資訊",
        }));

        setAllData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("資料抓取失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 僅在掛載時執行一次

  // --- 4. 搜尋邏輯 (Search) ---
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    
    // 過濾資料
    const filtered = allData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        文化部活動資訊查詢
      </Typography>

      {/* 搜尋框 */}
      <TextField
        label="搜尋活動名稱"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={handleSearch}
      />

      {/* 
          5. DataGrid 元件渲染 
          參考 image_56049e.png：改寫 hw#4 的 table
      */}
      <Box sx={{ height: 600, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          disableSelectionOnClick
          // DataGrid 內建分頁功能，不需要手動寫 prev/next 按鈕
          pagination 
        />
      </Box>
    </Container>
  );
};

export default Data;