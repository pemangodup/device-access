import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

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

export async function insertPlace(place) {
  try {
    const db = await getDb();

    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, lat, lng) VALUES (?,?,?,?)`,
      [place.title, place.imageUri, place.location.lat, place.location.lng]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.log("InsertPlace error: ", error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    const places = [];
    const db = await getDb();
    const _array = await db.getAllAsync("SELECT * FROM places");
    for (const dp of _array) {
      places.push(
        new Place(dp.id, dp.title, dp.imageUri, { lat: dp.lat, lng: dp.lng })
      );
    }
    console.log(places);
    return places;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
