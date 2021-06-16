/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import {precacheAndRoute} from 'workbox-precaching';
// import { Utils, Device } from '@nativescript/core'

precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener('message', function(event) {
  
  /*** SEND DATA TO CLIENT ***/
  // event.source.postMessage(`client, your position is (${position.coords.latitude}, ${position.coords.longitude})`)
  // console.log(event.data)



  /***  NATIVE APIS ***/

  // if (global.isAndroid && Device.sdkVersion >= '21') {
  //   const bm = Utils.android
  //     .getApplicationContext()
  //     .getSystemService(android.content.Context.BATTERY_SERVICE)
  //   const batLevel = bm.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
  //   event.source.postMessage(`client, batería ${batLevel} :)`)
  // }



  /***  GEOLOCATION SENSOR APIS (probado también con el acelerómetro) ***/

  // let accelerometer = null;
  // try {
  //     accelerometer = new Accelerometer({ frequency: 10 });
  //     accelerometer.addEventListener('error', event => {
  //         // Handle runtime errors.
  //         if (event.error.name === 'NotAllowedError') {
  //             console.log('Permission to access sensor was denied. acelerómetro');
  //         } else if (event.error.name === 'NotReadableError' ) {
  //             console.log('Cannot connect to the sensor. acelerómetro');
  //         }
  //     });
  //     accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
  //     accelerometer.start();

  //   event.source.postMessage(`client, sí acelerómetro :)`)

  // } catch (error) {
      
  //   event.source.postMessage(`client, no acelerómetro :(`)
  //   // Handle construction errors.
  //     if (error.name === 'SecurityError') {
  //         console.log('Sensor construction was blocked by the Permissions Policy. acelerómetro');
  //     } else if (error.name === 'ReferenceError') {
  //         console.log('Sensor is not supported by the User Agent. acelerómetro');
  //     } else {
  //         throw error;
  //     }

  // }


  // let geolocation = null;
  // try {
  //   geolocation = new GeolocationSensor({ frequency: 1 });
  //   geolocation.addEventListener('error', event => {
  //         // Handle runtime errors.
  //         if (event.error.name === 'NotAllowedError') {
  //             console.log('Permission to access sensor was denied. geolocation');
  //         } else if (event.error.name === 'NotReadableError' ) {
  //             console.log('Cannot connect to the sensor. geolocation');
  //         }
  //     });
  //     // geolocation.addEventListener('reading', () => reloadOnShake(geolocation));
  //   geolocation.start();

  //   event.source.postMessage(`client, sí geolocation :)`)

  // } 
  // catch (error) {
  //   event.source.postMessage(`client, no geolocation :(`)
  //   // Handle construction errors.
  //     if (error.name === 'SecurityError') {
  //         console.log('Sensor construction was blocked by the Permissions Policy. geolocation');
  //     } else if (error.name === 'ReferenceError') {
  //         console.log('Sensor is not supported by the User Agent. geolocation');
  //     } else {
  //         throw error;
  //     }

  // }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});
