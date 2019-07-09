const { app, BrowserWindow } = require('electron');
/* app/index.js */
const isDev = require('electron-is-dev');
const path = require('path');

let win;

const devUrl = 'http://localhost:3000';
// 本地文件路径定位到打包的react文件
const localUrl = `file://${path.resolve(
  __dirname,
  '../../app.asar/build'
)}/index.html`;
const appUrl = isDev ? devUrl : localUrl;
function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 });

  // 然后加载应用的 index.html。
  win.loadURL(appUrl);

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// 利用electron-debug，添加和Chrome类似的快捷键
isDev && require('electron-debug')({ enabled: true, showDevTools: false });
// 用于添加Chromium插件
function createDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');
  // 安装devtron
  const devtronExtension = require('devtron');
  devtronExtension.install();
  // 安装React开发者工具
  installExtension(REACT_DEVELOPER_TOOLS);
  installExtension(REDUX_DEVTOOLS);
}

// 修改应用启动事件
app.on('ready', () => {
  // createWindow();
  console.log("修改修改")
  // 只在开发环境加载开发者工具
  isDev && createDevTools();
});