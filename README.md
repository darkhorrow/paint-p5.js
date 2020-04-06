# <center>CIU - Práctica 8</center>

## Contenidos

* [Autoría](#autoría)
* [Introducción](#introducción)
* [Controles](#controles)
* [Implementación](#implementación)
  * [Selección de color](#selección-de-color)
  * [Selección de ancho](#selección-de-ancho)
  * [Selección de herramientas](#selección-de-herramientas)
  * [Deshacer/Rehacer](#deshacerrehacer)
  * [Guardar/Cargar imagen](#guardarcargar-imagen)
  * [Limpiar el canvas](#limpiar-el-canvas)
* [Animación del programa](#animación-del-programa)
* [Referencias](#referencias)

## Autoría

Esta obra es un trabajo realizado por Benearo Semidan Páez para la asignatura de Creación de Interfaces de Usuario cursada en la ULPGC.

## Introducción

El objetivo de esta práctica consiste en implementar en P5.js una aplicación similar al clásico MS Paint. En este trabajo tenemos un número limitado de herramientas usables.

## Controles

| Acción | Resultado |
| -- | -- |
| Arrastar click del ratón <br> (en el área de dibujo) | Dibuja/borra del canvas |
| Control + Z | Deshace los 2 puntos anteriormente dibujados |
| Control + Y | Rehace los 2 puntos anteriormente retirados |

## Implementación

La implementación consta de las siguientes herramientas:

### Selección de color

Para la selección de color, hago uso de la librería [Pickr](https://github.com/Simonwep/pickr). Con ella desplegamos una interfaz agradable, en la que se puede elegir el color y usarlo al darle a <i>'Save'</i>.

Además, muestra en todo momento el color a usar.

### Selección de ancho

La selección del grosor del pincel/borrador se elige con un componente Slider de P5.js, rotándolo con el atributo 'transform' de CSS para dejarlo vertical.

Otra función se encarga de poner a su derecha los círculos para dar una estimación del ancho que han seleccionado.

### Selección de herramientas

Este trabajo dispone de 3 herramientas de interacción con el canvas de manera directa:

* Pincel, que permite dibujar con el color seleccionado.
* Borrador, que a efectos prácticos, dibuja en blanco.
* Cuentagotas, que permite escoger un color de los presentes en el canvas, como por ejemplo al cargar una imagen.

El programa muestra con una pequeña animación de CSS qué herramienta de estas está siendo usada.

### Deshacer/Rehacer

Como se mencionaba en los controles, podemos usar Ctrl + Z y Ctrl + Y para hacer estas operaciones u, opcionalmente, usar los botones.


### Guardar/Cargar imagen

El programa permite guardar el dibujo generado en el canvas en formato <i>jpg</i>.

De manera paralela, permite seleccionar una imagen del equipo del usuario mediante el <i>input</i> de tipo fichero que proporciona P5.js, el cual varía su visualización con respecto a su forma inicial gracias a unas clases CSS que permiten mostrarlo como un botón.

Nota: En el cargado de archivo, sólo se garantiza el correcto funcionamiento si es de formato <i>jpg</i>. Aunque en teoría funciona para cualquier formato de imagen, he experimentado en algunos equipos (Mac en especial) que los <i>png</i> pueden no cargar, al igual que los <i>gif</i>.

### Limpiar el canvas

El botón <i>Clear</i> resetea todos el canvas, vaciando la posible imagen cargada y las líneas dibujadas.

## Animación del programa

![GIF](animation/animation.gif)

## Referencias

- <b>[[Animación CSS del borde]](https://stackoverflow.com/questions/28365839/dashed-border-animation-in-css3-animation)</b>

- <b>[[Input fichero como botón]](https://codepen.io/yashwant/pen/VjXYZd)</b>

- <b>[[Referencia de P5.js]](https://p5js.org/reference/)</b>
