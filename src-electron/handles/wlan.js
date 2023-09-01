import { exec } from "child_process";
import util from "util";
import Wifi from "node-wifi";
import os from "os";

const platform = process.platform || os.platform();


Wifi.init({
  iface: platform === "linux" ? "wlan0" : "WLAN" // network interface, choose a random wifi interface if set to null
  // iface:  "WLAN" // network interface, choose a random wifi interface if set to null
});

export async function open() {
  const execPromisify = util.promisify(exec);
  try {
    const {
      stdout,
      stderr
    } = await execPromisify("sudo nmcli radio wifi on");
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}

export async function close() {
  const execPromisify = util.promisify(exec);
  try {
    const {
      stdout,
      stderr
    } = await execPromisify("sudo nmcli radio wifi off");
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}

export async function getStatus() {
  const execPromisify = util.promisify(exec);
  try {
    const {
      stdout,
      stderr
    } = await execPromisify("sudo nmcli radio wifi");
    return parseWlanStatus(stdout);
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function scan() {
  try {
    return await Wifi.scan();
  } catch (e) {
    console.log(e)
    return null;
    // console.log(e);
  }

  /*
      networks = [
          {
            ssid: '...',
            bssid: '...',
            mac: '...', // equals to bssid (for retrocompatibility)
            channel: <number>,
            frequency: <number>, // in MHz
            signal_level: <number>, // in dB
            quality: <number>, // same as signal level but in %
            security: 'WPA WPA2' // format depending on locale for open networks in Windows
            security_flags: '...' // encryption protocols (format currently depending of the OS)
            mode: '...' // network mode like Infra (format currently depending of the OS)
          },
          ...
      ];
      */
}

export async function getCurrentConnections() {
  try {
    return Wifi.getCurrentConnections();
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function connect(event, data) {
  // data: { ssid: 'ssid', password: 'password' }
  try {
    return Wifi.connect(data);
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function disconnect() {
  try {
    return Wifi.disconnect();
  } catch (e) {
    console.log(e)
    return null;
  }
}
export async function deleteConnection(event, data) {
  // data : { ssid: 'ssid' }
  try {
    return Wifi.deleteConnection(data);
  } catch (e) {
    console.log(e)
    return null;
  }
}

function parseWlanStatus(output) {
  const status = output.trim();
  return status === "enabled";
}
