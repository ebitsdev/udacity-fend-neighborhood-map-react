export default function customServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/custom_sw.js', {scope: '/'})
      .then(function(reg) {
        console.log('Registration succeeded!', reg);
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }
