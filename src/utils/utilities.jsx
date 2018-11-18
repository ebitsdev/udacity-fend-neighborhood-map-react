import idb from "idb";
// Utilities inspired from Ryan Waite Udacity mentor video tutorial
// from https://youtu.be/LvQe7xrUh7I?list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s
export const idbPromise = idb.open("africanresto-db", 1, upgradeDB => {
  let db_venues = upgradeDB.createObjectStore("venues", { keyPath: "id" });
  db_venues.createIndex("id", "id");
});

export function getRestoData() {
  return idbPromise.then(venueDB => {
    return venueDB
      .transaction("venues")
      .objectStore("venues")
      .getAll();
  });
}

export function storeVenuesData(venues) {
  if (!venues || !Array.isArray(venues)) {
    return Promise.reject('"venues" need to be in array format');
  }
  if (venues === 0) {
    return Promise.reject('"venues" should not be empty');
  }
  for (let venue of venues) {
    if (venue.constructor !== Object) {
      return Promise.reject('"venues" should contain only object literals');
    }
    if (!venue.id) {
      return Promise.reject('"venues" should have children with unique id');
    }
  }
  return idbPromise.then(venueDB => {
    const tx = venueDB.transaction("venues", "readwrite");
    let store = tx.objectStore("venues");
    venues.forEach(venue => {
      store.put(venue);
    });
    return tx.complete;
  });
}

export function getVenuesData() {
  return new Promise((resolve, reject) => {
    getRestoData()
      .then(venues => {
        if (venues.length > 0) {
          return resolve(venues);
        }
        // Foursquare api does not work properly with ``, it only does with '' or ""
        const url =
          "https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1c8941735&intent=browse&near=Silver+Spring&limit=15&radius=4900&client_id=XQSXUGIR140AWUVFJJ120S31IPIXQYIO2QJ2ZN2U0ZPLLG4P&client_secret=A0N5P5VI4NG5UQK2GV2M0WU1FYY3KZ0EUYV0YMYZSX5IHHSU&v=20180806";

        // Use fetch API to get data from the server
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let { venues } = data.response;
            // make a local copy of the data
            storeVenuesData(venues).then(res => {
              console.log("Venues data stored");
              return resolve(venues);
            });
          })
          .catch(error => {
            console.log("There was an error while fetching the data", error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function gMapUrl() {
  const api_key = "AIzaSyDX41FXHwXEWbY4Mm7nsL8U5LRe1eFz5QY";
  return `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`;
}
export function getGMapImages(venue) {
  return `https://maps.googleapis.com/maps/api/streetview?size=150x150&location=
    ${venue.location.lat},${
    venue.location.lng
  }&heading=151.78&pitch=-0.76&key=AIzaSyDX41FXHwXEWbY4Mm7nsL8U5LRe1eFz5QY`;
}
