import Store from "electron-store";
import Wifi from "node-wifi";

const config = {
  name: "wlan-info"
}

const store = new Store(config);
store.set("rememberedConnections.aaaaa", "232112");
store.set("rememberedConnections.bbbbbb", "ewqrwq");

export async function get(event, key) {
  try {
    return await store.get(key);
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function set(event, key, value) {
  try {
    return await store.set(key, value);
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function remove(event, key) {
  try {
    return await tore.delete(key);
  } catch (e) {
    console.log(e)
    return null;
  }
}
