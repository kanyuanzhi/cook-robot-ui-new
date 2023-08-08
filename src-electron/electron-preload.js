/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

// contextBridge.exposeInMainWorld("electron", {
//
// });

contextBridge.exposeInMainWorld("windowAPI", {
  minimize: () => {
    BrowserWindow.getFocusedWindow()
      .minimize();
  },

  isFullscreen: () => {
    const win = BrowserWindow.getFocusedWindow();
    return win.isFullScreen();
  },

  toggle: () => {
    const win = BrowserWindow.getFocusedWindow();
    const isFullscreen = win.isFullScreen();
    win.setFullScreen(!isFullscreen);
  },

  close: () => {
    BrowserWindow.getFocusedWindow()
      .close();
  },

  // loadPreferences: () => ipcRenderer.invoke("myAPI:load-prefs")

});

contextBridge.exposeInMainWorld("wlanAPI", {
  open: () => {
    return ipcRenderer.invoke("wlan:open")
      .then(result => {
        return result;
      });
  },
  close: () => {
    return ipcRenderer.invoke("wlan:close")
      .then(result => {
        return result;
      });
  },
  getStatus: () => {
    return ipcRenderer.invoke("wlan:getStatus")
      .then(result => {
        return result;
      });
  },
  scan: () => {
    return ipcRenderer.invoke("wlan:scan")
      .then(result => {
        return result;
      })
      .catch(Error => {
        return null;
      });
  },
  getCurrentConnections: () => {
    return ipcRenderer.invoke("wlan:getCurrentConnections")
      .then(result => {
        return result;
      })
      .catch(Error => {
        return null;
      });
  },
  connect: (ssid, password) => {
    return ipcRenderer.invoke("wlan:connect", {
      ssid: ssid,
      password: password
    })
      .then(result => {
        return result;
      })
      .catch(Error => {
        return null;
      });
  },
  disconnect: () => {
    return ipcRenderer.invoke("wlan:disconnect")
      .then(result => {
        return result;
      })
      .catch(Error => {
        return null;
      });
  },
});
