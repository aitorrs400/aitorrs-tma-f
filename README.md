# AitorRS TMA | T - Manager

Proyecto para leer la codificación de la banda magnética de los billetes de transporte de la ATM (principalmente Barcelona) y mostrar los datos descodificados. Este proyecto está en desarrollo. Esta es la parte de front. Requiere soporte del back para que sea funcional. Este proyecto está basado sobre el código de **Evanonymous**: [Link de su aplicación](https://www.solosequenosenada.com/misc/opTmestre/opTmestre-JS.html).

> AVISO: Este proyecto está pensado SÓLAMENTE para leer los datos de los billetes. Modificar la banda magnética de un billete puede considerarse ilegal llegando a ser sancionado.

Para iniciar el proyecto en local hay que instalar los paquetes de node y ejecutarlo.

```
npm i
npm run dev
```

## Capturas de pantalla

### Pantalla princial

Esta es la  pantalla de inicio de la aplicación.

![](/static/images/screenshots/home.png)
> Pantalla de inicio

---

### Pantalla de visualización

En estas pantallas podemos ver un poco el apartado de visualización de datos.

![](/static/images/screenshots/dataview_1.png)
> Pantalla de visualización - vacía

---

En este ejemplo, podemos ver la información del código de una targeta.

![](/static/images/screenshots/dataview_2.png)
> Pantalla de visualización - con datos

---

### Pantalla de servicios

En estas pantallas podemos ver la interfaz para la gestión de los servicios (Bus, Metro, etc...). En esta pantalla, veremos un listado de todos los servicios que tenemos en la base de datos

![](/static/images/screenshots/service_1.png)
> Pantalla de servicios - listado

---

En esta pantalla podemos ver la interfaz de edición de un servicio.

![](/static/images/screenshots/service_2.png)
> Pantalla de servicios - edición

---

En esta pantalla podemos ver la interfaz para crear un nuevo servicio.

![](/static/images/screenshots/service_3.png)
> Pantalla de servicios - creación

---

### Pantalla de líneas

En estas pantallas podemos ver la interfaz para la gestión de las líneas para cada servicio. En esta pantalla, veremos un listado de todas las líneas que tenemos en la base de datos.

![](/static/images/screenshots/lines_1.png)
> Pantalla de líneas - listado

---

En esta pantalla podemos ver la interfaz de edición de una línea.

![](/static/images/screenshots/lines_2.png)
> Pantalla de líneas - edición

---

En esta pantalla podemos ver la interfaz para crear una nueva línea.

![](/static/images/screenshots/lines_3.png)
> Pantalla de líneas - creación

---

### Pantalla de estaciones

En estas pantallas podemos ver la interfaz para la gestión de paradas para las líneas. En esta pantalla, veremos un listado de todas las estaciones que tenemos en la base de datos.

![](/static/images/screenshots/stations_1.png)
> Pantalla de estaciones - listado

---

En esta pantalla podemos ver la interfaz de edición de una estación.

![](/static/images/screenshots/stations_2.png)
> Pantalla de estaciones - edición

---

En esta pantalla podemos ver la interfaz para crear una nueva estación.

![](/static/images/screenshots/stations_3.png)
> Pantalla de estaciones - creación