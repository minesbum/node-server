Preguntas y Respuestas

¿Qué sucedio al usar async y await?

Al usar async y await, el código asíncrono se ejecuta de manera más secuencial y fácil de leer, lo que facilita la comprensión del flujo de la aplicación. Además, se facilita el manejo de errores mediante el uso de bloques try/catch, lo que mejora la gestión de excepciones y errores durante la ejecución de las promesas.

¿Qué sucedio al usar el método then()?

El método then() se utiliza para encadenar acciones después de que una promesa se resuelve. Sin embargo, su uso puede resultar en un código más anidado y menos legible en comparación con el uso de async y await. Además, requiere un manejo más cuidadoso de errores a través del uso de funciones catch() adicionales para el manejo de errores.

¿Qué diferencias encontraste entre async, await y el método then()?

La principal diferencia radica en la legibilidad y la estructura del código. Mientras que async y await hacen que el código asíncrono se asemeje más a un código sincrónico y son más fáciles de leer y mantener, el método then() tiende a crear un código más anidado y menos legible. async y await también facilitan el manejo de errores con bloques try/catch, lo que simplifica la gestión de excepciones y errores.