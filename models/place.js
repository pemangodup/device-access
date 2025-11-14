export class Place {
  constructor(id, title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = { lat: location.lat, lng: location.lng }; // {lat: 0.383883, lng: 9.7373}
    this.id = id;
  }
}
