import * as SQLite from "expo-sqlite";

let database;

async function getDb() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("placeDatabase");
  }
  return database;
}

export async function init() {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL, 
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {});
  return promise;
}
