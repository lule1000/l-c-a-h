# Like Camping at home

Hola, espero que estes muy bien! Mi nombre es Ulises Catarinolo y esta es una aplicación web realizada con el objetivo de cumplir y entregar el proyecto final de CoderHouse del curso de React Js, espero que te guste y me dejes tu feedback que es muy bienvenido, gracias!

## Herramientas utilizadas:

- ### React Js

Me apoyé principalmente en React ya que era la consigna principal del curso. Esto me permitió crear una aplicación interactiva basada en componentes funcionales, lo que me facilitó muchísimo a la hora de hacer la estructura de la aplicación. 

- ### Bootstrap

Bootstrap es una librería de CSS que me ayudó mediante las clases a darle estilo y diseño a mi aplicación. Decidí hacer la “instalación” mediante CDN ya que considero que para este tipo de herramientas y por el uso que le doy no vale la pena instalarlas por NPM.

- ### Material UI

Material UI fue una de las cosas que más centré por fuera de lo que dieron en el curso y la verdad fue una de las cosas que más me gusto. Me ayudó a darle estilos a la página y también a implementar el dark mode (junto con el botón para pasar de light a dark y viceversa). Por otro lado la utilice Material para crear mis cards en el itemList y también para hacer la tabla en la que se detallan los productos añadidos al carrito y su total.

- ### Formik

Utilice Formik para validar el formulario que se envía a Firebase. El botón de “send” se habilita una vez que los tres campos estén completos y con sus respectivos requisitos.

- ### Sass

Sass es un preprocesador que me permite ordenar mis estilos de una manera mucho más prolija y utilizando menos líneas de código. Lo utilice principalmente para media queries y los breakpoints.

- ### React Router Dom

Esta herramienta me permitió crear un enrutamiento en toda la página y por consecuencia generar navegabilidad a las otras secciones. Simplemente envolví en una etiqueta Routes cada Route que me llevaba a otras vistas. La NavBar fue el único componente que quedó fuera de esto ya que mi deseo es que se muestre en todas las vistas de la página.

- ### Firebase

Firebase me permitió crear una base de datos a la cual yo solicitaba información acerca de los productos y luego mostrarlos con su respectiva data. También me sirvió para poder tomar las órdenes e información que se mandaba a través del formulario.