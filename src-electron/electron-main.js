import { app, BrowserWindow, nativeTheme, ipcMain } from "electron";
import path from "path";
import os from "os";
import { initialize, enable } from "@electron/remote/main";
import {
  connect, disconnect,
  getCurrentConnections,
  scan, open, close, getStatus
} from "app/src-electron/handles/wlan";
import { updateAutoLaunch } from "app/src-electron/auto-launch";

initialize();

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs")
      .unlinkSync(path.join(app.getPath("userData"), "DevTools Extensions"));
  }
} catch (_) {
}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    fullscreen: platform === "linux",
    useContentSize: true,
    disableAutoHideCursor: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  });

  enable(mainWindow.webContents);

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.commandLine.appendSwitch("ignore-certificate-errors");

app.whenReady()
  .then(async () => {
    // await updateAutoLaunch();
    ipcMain.handle("wlan:open", open);
    ipcMain.handle("wlan:close", close);
    ipcMain.handle("wlan:getStatus", getStatus);
    ipcMain.handle("wlan:scan", scan);
    ipcMain.handle("wlan:getCurrentConnections", getCurrentConnections);
    ipcMain.handle("wlan:connect", connect);
    ipcMain.handle("wlan:disconnect", disconnect);
    createWindow();
  });

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
