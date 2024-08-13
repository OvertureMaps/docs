# Overture 文檔

這個 repo 使用 [Docusaurus](https://docusaurus.io/) 來部屬在 [docs.overturemaps.org](https://docs.overturemaps.org) 上看到的文檔頁面。

### 檔案結構
- `blog/`：Overture 工程 blog 的條目，可在 docs.overturemaps.org/blog 查看。
- `community/`：展示 Overture 數據在實際使用情況下的社區頁面。
- `docs/`：主要的文檔頁面，可在 docs.overturemaps.org/ 查看。這些頁面的側邊欄在 `sidebars.js` 文件中手動編輯。
- `release-blog/`：每個 Overture 數據發佈的發布說明。最新的發布可以在 https://docs.overturemaps.org/release/latest/ 查看。
- `i18n`：各個語言的翻譯檔案存放處，目前收錄了正體中文，欲產生其他語言的檔案請參考 [Docusaurus 文檔](https://github.com/facebook/docusaurus)
- 請注意，沒有 `schema reference` 文件夾。請參見下文。

### 架構參考 (`docs.overturemaps.org/schema`)
Overture 架構倉庫 [github/overturemaps/schema](https://github.com/overturemaps/schema) 維護官方的 Overture 架構和實際架構參考頁面相關的文檔。這是為了確保架構、文檔和相關示例始終保持同步。

 `fetch_schema.sh` 將架構文檔的內容注入 `docs/schema/` 並將架構 `YAML` 文件和示例分別複製到 `docs/_schema` 和 `docs/_examples`。這個腳本在每次構建時運行。

因此，任何在 `docs.overturemaps.org/schema`（標題中的 **架構參考** 連結下）可用的內容都來自 Overture 架構倉庫，而非此倉庫。對 `schema` 的任何更改將在每次構建時被覆蓋。



## 開發
Docusaurus 需要 node。
首先，安裝所需的套件：
```
$ npm install
```

然後在本地啟動伺服器：
```
$ npm run start
```

現在，用瀏覽器打開 http://localhost:3000 預覽網頁。


> 中文翻譯最後更新時間：2024/08/13 by [iach526526](https://github.com/iach526526)