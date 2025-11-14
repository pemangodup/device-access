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
    console.log("I am from error: " + error);
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
    return places;
  } catch (error) {
    console.log("I am from error: " + error);
    throw error;
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const db = await getDb();
    const place = await db.getAllAsync(
      "SELECT * FROM places WHERE id =?",
      `${id}`
    );

    return place[0];
  } catch (error) {
    console.log("I am from error: " + error);
    throw error;
  }
}

// Delete ALL The Data
export async function clearDb() {
  try {
    const db = await getDb();
    await db.execAsync("DELETE FROM places");
  } catch (error) {
    console.log("Delete error: " + error);
    throw error;
  }
}
