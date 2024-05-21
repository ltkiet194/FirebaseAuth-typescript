import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const storeData = (key: string, value: string) => {
      try {
            storage.set(key, value);
      } catch (e) {
            console.error(e);
      }
};

const getData = (key: string) => {
      try {
            const value = storage.getString(key);
            return value;
      } catch (e) {
            console.error(e);
      }
};

const removeData = (key: string) => {
      try {
            storage.delete(key);
      } catch (e) {
            console.error(e);
      }
};

const clearAllData = () => {
      try {
            storage.clearAll();
      } catch (e) {
            console.error(e);
      }
}
export { storeData, getData, removeData };