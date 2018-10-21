export default function customServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/custom_sw.js', {scope: '/'})
      .then(function(register) {
        // console.log('Registration succeeded!', register);
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }
