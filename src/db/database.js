import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('reparaciones.db');

export const openDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS repairs (id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle TEXT, date TEXT, description TEXT, cost REAL, mechanic TEXT, location TEXT, kilometres REAL)',
                [],
                () => {
                    resolve(db);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const addRepair = (repair) => {
    const { vehicle, date, description, cost, mechanic, location, kilometres } = repair;

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO repairs (vehicle, date, description, cost, mechanic, location, kilometres)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [vehicle, date, description, cost, mechanic, location, kilometres],
                (_, { insertId }) => {
                    resolve(insertId);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const getRepairs = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM repairs',
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};