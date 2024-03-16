// db.js

const DB_NAME = 'my_database';
const DB_VERSION = 1;
let db;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log('Database opened successfully');
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
      console.log('Object store created successfully');
    };
  });
};

export const getDB = () => {
  return db;
};
