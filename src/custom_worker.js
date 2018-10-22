export default function customServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/custom_sw.js', {scope: '/'})
      .then((register) =>{
        console.log('Registration succeeded!', register);
      })
      .catch((error) =>{
        console.log('Registration failed with ' + error);
      });
    }
  }
