import idb from "idb";
// Utilities inspired from Ryan Waite Udacity mentor video tutorial
// from https://youtu.be/LvQe7xrUh7I?list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s
export const idbPromise = idb.open("africanresto-db", 1, upgradeDB => {
  upgradeDB.createObjectStore("fetch_api_calls");
  let db_venues = upgradeDB.createObjectStore("venues", { keyPath: "id" });
});

export function getAPI_fetches(key) {
  if (!key) {
    console.log(key);
    return Promise.reject("Please provide a key argument");
  }
  if (key.contructor !== String) {
    console.log(key);
    return Promise.reject('"key" needs to be a string');
  }
  return idbPromise.then(venueDB => {
    return venueDB
      .transaction("fetch_api_calls")
      .objectStore("fetch_api_calls")
      .get(key);
  });
}

export function getRestoData() {
  return idbPromise.then(venueDB => {
    return venueDB
      .transaction("venues")
      .objectStore("venues")
      .getAll();
  });
}

export function storeFetchAPIResults(key, value) {
  if (!key) {
    console.log(key);
    return Promise.reject('"key", please provide a key');
  }
  if (key.contructor !== String) {
    return Promise.reject('"key" needs to be a string');
  }
  if (!value) {
    console.log(value);
    return Promise.reject('"value" value cannot be empty or undefined');
  }
  return idbPromise.then(venueDB => {
    const tx = venueDB.transaction("fetch_api_calls", "readwrite");
    let store = tx.objectStore("fetch_api_calls");
    store.put(value, key);
    return tx.complete;
  });
}

export function storeVenuesData(venues) {
  if (!venues || Array.isArray(venues)) {
    console.log(venues);
    return Promise.reject('"venues" need to be in the array format');
  }
  if (venues === 0) {
    return Promise.reject('"venues" should not be empty');
  }
  for (let venue of venues) {
    if (venue.constructor !== Object) {
      console.log(venue);
      return Promise.reject('"venues" should contain only object literals');
    }
    if (!venue.id) {
      console.log(venue.id);
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

export function getGMapData() {
  return new Promise(resolve => {
    window.resolveGMapPromise = () => {
      resolve(window.google);
    };
  });
}

export function getVenuesData() {
  return Promise((resolve, reject) => {
      getRestoData().then(venues =>{
          if(venues.length > 0){
              console.log('returning data from local idb');
              return resolve(venues);
          }
          console.log('Getting data from foursquare api');
          let neighborhood = 'Silver Spring, MD';
          let query = 'African';
      })
  });
}
