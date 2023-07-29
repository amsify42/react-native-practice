import * as sqLite from "expo-sqlite";

const database = sqLite.openDatabase("users.db");

function executePromise(query, bindValues=[]) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((txn) => {
          txn.executeSql(
            query,
            bindValues,
            (_, result) => {
              resolve(result);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
    return promise;
}

export function dbInit() {
  return executePromise(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT NULL,
        updated_at DATETIME DEFAULT NULL
    )`);  
}

export function getUsers() {
    return executePromise(
        `SELECT * FROM users`,
    );
}

export function insertUser(name, email) {
    return executePromise(
        `INSERT INTO users(name, email, created_at, updated_at) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
        [name, email]
    );
}

export function updateUser(id, name, email) {
    return executePromise(
        `UPDATE users SET name=?, email=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
        [name, email, id]
    );
}

export function deleteUser(id) {
    return executePromise(
        `DELETE FROM users WHERE id=?`,
        [id]
    );
}

export default dbInit;
