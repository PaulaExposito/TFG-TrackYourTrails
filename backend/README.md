# Backend



### Cómo usar

Para ejecutar el backend se hace uso de un contenedor de Docker. La imagen se crea y se ejecuta el contenedor al ejecutar el script ```run.sh```. Se abre el puerto 3000 del contenedor y se mapea al de la máquina local, por lo que podemos acceder desde ```localhost:3000```.



### Endpoints

Hay cuatro tipos de endpoints en la API, todas las peticiones están precedidas por ```/api```.

* **Autenticación:**  ```/signup```, ```/login``` y ```/logout```.

  *Petición*: POST localhost:3000/api/signup

  ```json
  {
      "username": "amaia",
      "password": "amaia123"
  }
  ```

  *Respuesta:*

  ```json 
  {
      "user": {
          "statistics": {
              "distance": 0,
              "gradient": 0,
              "time": 0,
              "numberOfRegisters": 0
          },
          "friends": [],
          "_id": "60c8714ed193a7a340d19e35",
          "username": "amaia",
          "password": "$2a$10$kuEJcK8Q2pTMnfk1vQ34YO1m8Snd08y9StVhY1/eFDsxxEz5AeoYG",
          "events": [],
          "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM4NzE0ZWQxOTNhN2EzNDBkMTllMzUiLCJpYXQiOjE2MjM3NDg5NDIsImV4cCI6MTYyMzgzNTM0Mn0.a55b6qZ2z7y0_DIgA1oLLdUr4GqwjCiZoaWhcT8YWgk"
  }
  ```

  

* **Usuarios:** ```/users```, ```users/:user```, ```users/:user/events``` y ```users/:user/statistics```.

  *Petición:* DELETE localhost:3000/api/users/amaia

  *Respuesta*: 

  ```json
  {
      "msg": "amaia was deleted"
  }
  ```

  

* **Trails:** ```/trails```,  ```/trails/:trail```, ```/trails/:trail/point``` y ```/trails/:trail/points```.

  *Petición:* PUT localhost:3000/api/trails/{{trailId}}/point

  ```json
  {
      "latitude": 18.452,
      "longitude": -13.444
  }
  ```

  *Respuesta:*

  ```json
      "points": [
          [...]
          {
              "_id": "60c874cbd193a7cb9cd19e38",
              "latitude": "18.452",
              "longitude": "-13.444"
          }
      ],
  ```



* **Eventos:** ```/events```, ```/events/:event``` y ```/events/:event/user```.

  *Petición*: GET localhost:3000/events/{{eventId}}

  *Respuesta:*

  ```json
  {
      "users": [],
      "photos": [],
      "_id": "60c875a8d193a76704d19e3a",
      "title": "event1",
      "active": true,
      "__v": 0
  }
  ```

