class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat: 0.383883, lng: 9.7373}
    this.id = new Date().toString() + Math.random().toString();
  }
}
