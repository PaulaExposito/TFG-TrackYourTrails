/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
//  */
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

import {precacheAndRoute} from 'workbox-precaching';
// import { GeoLocationSensor } from 'libreact/lib/GeoLocation';
// Your other import statements go here.

precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener('message', function(event) {

  console.log("fksdlhgklaghsadglañsdhgsdklahgsalkdgakdhgñsdhgskghkdñhfkhfañfdh")
  console.log(event.data)



  let accelerometer = null;
  try {
      accelerometer = new Accelerometer({ frequency: 10 });
      accelerometer.addEventListener('error', event => {
          // Handle runtime errors.
          if (event.error.name === 'NotAllowedError') {
              console.log('Permission to access sensor was denied. acelerómetro');
          } else if (event.error.name === 'NotReadableError' ) {
              console.log('Cannot connect to the sensor. acelerómetro');
          }
      });
      accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
      accelerometer.start();

    event.source.postMessage(`client, sí acelerómetro :)`)

  } catch (error) {
      
    event.source.postMessage(`client, no acelerómetro :(`)
    // Handle construction errors.
      if (error.name === 'SecurityError') {
          console.log('Sensor construction was blocked by the Permissions Policy. acelerómetro');
      } else if (error.name === 'ReferenceError') {
          console.log('Sensor is not supported by the User Agent. acelerómetro');
      } else {
          throw error;
      }

  }


  let geolocation = null;
  try {
    geolocation = new GeolocationSensor({ frequency: 1 });
    geolocation.addEventListener('error', event => {
          // Handle runtime errors.
          if (event.error.name === 'NotAllowedError') {
              console.log('Permission to access sensor was denied. geolocation');
          } else if (event.error.name === 'NotReadableError' ) {
              console.log('Cannot connect to the sensor. geolocation');
          }
      });
      // geolocation.addEventListener('reading', () => reloadOnShake(geolocation));
    geolocation.start();

    event.source.postMessage(`client, sí geolocation :)`)

  } catch (error) {
      
    event.source.postMessage(`client, no geolocation :(`)
    // Handle construction errors.
      if (error.name === 'SecurityError') {
          console.log('Sensor construction was blocked by the Permissions Policy. geolocation');
      } else if (error.name === 'ReferenceError') {
          console.log('Sensor is not supported by the User Agent. geolocation');
      } else {
          throw error;
      }

  }






  // let geolocation0 = new GeolocationCoordinates();
  // console.log(geolocation0)

  // let geolocation1 = new GeolocationPosition();
  // console.log(geolocation1)

  // let accelerometer = new Accelerometer({ frequency: 10 });

  // let geolocation2 = new GeolocationSensor({ frequency: 1 });
  // console.log(geolocation2)

  // GeoLocationSensor.read()
  //   .then(geo => {
  //     console.log(`lat: ${geo.latitude}, long: ${geo.longitude}`)
  //     event.source.postMessage(`client, your position is (${geo.latitude}, ${geo.longitude})`)
  //   })
  //   .catch(error => console.error(error.name));

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition( position => {
  //     event.source.postMessage(`client, your position is (${position.coords.latitude}, ${position.coords.longitude})`)
  //   });
  // } 
  // else {
  //   event.source.postMessage("hi client - no location")
  // }
  // var promise = self.clients.matchAll()
  //   .then(function(clientList) {

  //   var senderID = event.source.id;

  //   clientList.forEach(function(client) {
 
  //     if (client.id === senderID) {
  //       return;
  //     }
  //     client.postMessage({
  //       client: senderID,
  //       message: event.data
  //     });
  //   });
  // });

  // if (event.waitUntil) {
  //   event.waitUntil(promise);
  // }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});
