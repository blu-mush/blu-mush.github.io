# blu mush site

blu mush 的連結頁，用來取代 Linktree。

概念是「起霧的玻璃」：團照被一層霧蓋住，手指或滑鼠擦過的地方會變清楚，過幾秒又慢慢起霧。連結卡片永遠浮在霧上面，不擦也能直接點。

## 檔案結構

```
index.html          頁面骨架
css/style.css       樣式（顏色變數在最上面）
js/data.js          所有連結、發行作品、現場影片  ← 平常只要改這個
js/lyrics.js        歌詞
js/fog.js           霧的效果（參數在最上面的 CONFIG）
js/icons.js         平台圖示（simple-icons，CC0）
js/main.js          把資料排成畫面
assets/img/         團照、封面、結霜紋理、logo
```

## 常見修改

- **新歌上架**：在 `js/data.js` 的 `RELEASES` 最上面加一筆，封面放進 `assets/img/`。
- **改歌詞**：改 `js/lyrics.js`，每首歌是「段落」陣列，每段是「行」陣列。
- **霧太濃、太淡，或回來得太快、太慢**：調 `js/fog.js` 最上面的 `CONFIG`。
  - `tint`：霧的顏色和濃度
  - `brush`：擦拭範圍
  - `regrow`：霧長回來的速度

## 在自己電腦上預覽

這個網站沒有建置步驟，任何靜態伺服器都可以。例如在資料夾裡執行：

```
python3 -m http.server 8000
```

然後打開 http://localhost:8000 。

直接雙擊 index.html 會打不開：瀏覽器不允許用 `file://` 載入 JS 模組，一定要透過伺服器。
