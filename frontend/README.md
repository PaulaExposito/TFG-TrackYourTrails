# Frontend



### Cómo usar

Para ejecutar la aplicación frontend se hace uso de un contenedor de Docker. La imagen se crea y se ejecuta el contenedor al ejecutar el script ```run.sh```. Se abre el puerto 8080 del contenedor y se mapea al de la máquina local, por lo que podemos acceder desde ```localhost:8080```.


También puede ejecutarse sin hacer uso de Docker, utilizando los siguientes comandos:

```bash
npm install
quasar dev -m pwa 
```

Para preparar la aplicación para producción se utiliza ```quasar build -m pwa```.
