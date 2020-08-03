# TP-Objetos
TP Objetos.
El trabajo practico que desarrolle consiste en un programa que recibe los distintos trayectos de un vuelo (origen, escala1, escala2,…, escalaN, destino) y con esos datos imprime un grafo no dirigido entre los distintos aeropuertos por los que va parando el avión.
Librerías utilizadas:
Undirender: es la que me asignaron los tutores. Es una librería que, dada una lista de adyacencia que describe un gráfico no dirigido, devuelva una cadena de filas de ancho por columnas de alto que representa el gráfico en una fuente de ancho fijo. Para poder realizar el render, se le deben dar los valores de ancho, alto y la lista de adyacencias.
En este trabajo practico, la librería se utilizo para realizar el grafo entre los distintos aeropuertos por los que va pasando un avión a los largo de su trayecto.

ReadlineSync: es una librería que se utiliza para que el usuario pueda ingresar datos y valores por teclado.  En este trabajo practico, esta librería se utilizo para diferentes acciones:
	Al comienzo del programa, el usuario debe ingresar por teclado el número  1 si desea realizar un grafo o no.
	En caso de que el usuario haya elegido la opción 1 en el apartado anterior, ahora el usuario deberá elegir entre ingresar los aeropuertos desde un archivo txt o ingresarlos manualmente. 
	En caso de que el usuario decida ingresarlos manualmente,  también va a ser necesario ingresar por teclado la cantidad de estaciones.
	Por último  se utiliza para darle valores de alto y ancho al grafo., 

@types/node: es una librería que se utiliza para poder insertarle al programa valores desde un archivo txt. Esta librería la utilizo para tomar el listado de aeropuertos desde un archivo txt pre cargado, en caso de que el usuario así lo decida.
cli-diagram: es una librería que dibuja un cuadro contorneado con algunos contenidos de cadena. El contenido puede ser multilínea. Los cuadros son lo suficientemente flexibles como para contener otros diagramas que le permiten crear estructuras anidadas complejas. En este programa la utilizo para imprimir carteles de “despedida” cuando finaliza el programa.


Descripción del proyecto.

El programa comienza preguntándole al usuario si desea realizar un grafo de su viaje, y le solicita el ingreso del valor 1 para continuar, o cualquier otro valor para salir. 
Si presiona cualquier valor que no sea 1  este es el caso en que el usuario decide salir del programa; se imprimirá un cartel de despedida y finalizara el programa. 
Si presiona el valor 1  En caso de que desee continuar, el programa le va a solicitar que presione el valor 1 si desea ingresar los aeropuertos manualmente, o que presione 2 si desea ingresarlos desde un archivo txt pre cargado.

Si presiona el valor 1  Se ejecuta la función createInformativeArray(). Este método va a crear la lista de adyacencia a partir de datos ingresados por el usuario. El usuario deberá ingresar la cantidad de escalas, y los aeropuertos por donde pasara el avión. Esa lista de adyacencia es la que va a utilizar el programa para realizar el grafo no dirigido. 

Si presiona el valor 2  Se ejecuta la función getInformativeArray() que va a crear la lista de adyacencia a partir de datos tomados del archivo con formato txt “trip.txt”. Esa lista de adyacencia es la que va a utilizar el programa para realizar el grafo no dirigido.

Con la lista de aeropuertos (o lista de adyacencia) generada, el programa va a pedirle al usuario que ingrese el ancho y el alto que desea que tenga el grafo.

Con estos tres elementos ya definidos (ancho, alto y lista de adyacencia), el programa declara la variable grafico de tipo grafo y su constructor va a recibir como parámetros los datos de ancho, alto y lista de adyacencia definidos anteriormente.

Luego se va a ejecutar la función getGraph() perteneciente a la clase Graph, y utilizando la librería undirender va a imprimir en pantalla el grafo no dirigido entre los distintos aeropuertos.

Por último el programa va a ejecutar la función printPlatform(), que, utilizando la librería cli-diagram, luego de un lapso de 3 segundos va a imprimir la puerta de embarque y un saludo de despedida.
Clases

Clase Graph
Esta clase es la clase principal del programa. Al ser el grafo un objeto, en esta clase definimos los atributos de ese objeto, y los métodos necesarios para poder crearlo, modificarlo, imprimirlo y manipularlo. Es una clase compuesta, ya que dentro de sus atributos aparece la clase data.
Variables que la componen
- width: Variable privada de tipo number. Indica el ancho del grafo: Se accede a ella mediante los métodos setWidth() y getWidth(). 
- heigth: Variable privada de tipo number. Indica el alto del grafo: Se accede a ella mediante los métodos setHeigth() y getHeigth(). 
- information: Variable privada de tipo Data. Contiene la lista de adyacencia que va a utilizar la librería para trazar el grafo. Se accede a ella mediante el método getInformation().

Constructor: al crear una variable de tipo Graph el usuario debe darle los parámetros de alto, ancho e información. Estos tres valores van a  “setear” las variables iniciales width, heigth e information del objeto creado.

Métodos que la componen
 setWidth(): Método público. Recibe como parámetro un variable de tipo number. Utilizara esta variable para “setear” el atributo width del objeto. No retorna nada (método de tipo void).
  
getWidth(): Método público. No recibe parámetros. Este método se utiliza para consultar el valor del atributo width de un determinado objeto. Retorna un valor de tipo number.

setHeigth(): Método público. Recibe como parámetro un variable de tipo number. Utilizara esta variable para “setear” el atributo heigth del objeto. No retorna nada (método de tipo void).

getHeigth(): Método público. No recibe parámetros. Este método se utiliza para consultar el valor del atributo heigth de un determinado objeto. Retorna un valor de tipo number.

getInformation(): Método público. No recibe parámetros. Este método devuelve la lista de adyacencia completa del objeto. El usuario deberá utilizar los métodos de la clase Data para acceder a los valores de esta lista. Devuelve un objeto del tipo Data. 

getGraph(): Método público. Al ser ejecutado, este método toma los atributos width, heigth y lista de adyacencia del objeto y con esos elementos genera e imprime el grafo no dirigido. No retorna nada (método de tipo void). En este método utilizo la librería asignada por los tutores (undirender).
    

Clase Data
Esta clase es la clase la que define la lista de adyacencias. La lista de adyacencias es un objeto en sí, con sus atributos y sus métodos, necesario para crear el grafo. En esta clase definimos los atributos de ese objeto, y los métodos necesarios para poder ingresarle valores, modificarlos, eliminarlos, consultarlos, definirlos. No es una clase compuesta, pero si es necesaria para que el programa funcione correctamente.

Variables que la componen
-data: Variable privada de tipo Array<Array<String>>. Contiene la lista de adyacencia, necesaria e indispensable para que el programa pueda crear el grafo. Se accede a ella mediante los métodos setData() y getData(). 

Constructor: al crear una variable de tipo Data el usuario debe darle como parámetro un objeto que contenga en su interior arreglos de 2 posiciones de tipo string. En mi caso lo declare como un arreglo que contiene arreglos de tipo string (Array<Array<String>>). 
Este parámetro va a setear la variable inicial data del objeto de tipo Data al momento de ser declarado.

Métodos que la componen
setData(): Método público. Recibe como parámetro un objeto de tipo Array<Array<String>>. Utilizara esta variable para “setear” el atributo data del objeto con el que estamos trabajando. No retorna nada (método de tipo void).

getData(): Método público. No recibe parámetros. Este método devuelve la lista de adyacencia completa del objeto para poder acceder a los valores del mismo. 


Clase FileManager
Esta clase es la clase contiene los atributos y métodos necesarios para que definir la lista de elementos que luego van a formar la lista de adyacencias. Estos elementos son recibidos a partir de un archivo con formato txt. Solo hay que pasarle por parámetro la dirección del archivo txt al momento de declarar la variable de tipo FileManager y el mismo constructor va a generar el arreglo con los elementos de tipo string. No es una clase compuesta, pero si es necesaria para cuando el usuario indique que desea ingresar los aeropuertos desde un archivo txt.

Variables que la componen
-stringArray: Variable privada de tipo <Array<String>. Contiene el listado con los elementos que luego van a componer la lista de adyacencias, necesaria e indispensable para que el programa pueda crear el grafo.  Se accede a esta lista mediante los métodos printStringArray() y getStringArray(). 

Constructor: al crear una variable de tipo FileManager, el usuario debe darle como parámetro una variable de tipo string que va a ser la ruta del archivo txt. El constructor va a recibir esa dirección y a partir de ese listado va a generar el arreglo de strings que contiene los aeropuertos.

Métodos que la componen
printStringArray(): Método público. No recibe parametros. Este método imprime el arreglo con los aeropuertos cuando se ejecuta. No retorna nada (método de tipo void).

printStringArray(): Método público. No recibe parámetros. Este método devuelve la lista de aeropuertos completa. Es la lista que luego utilizaremos para generar la lista de adyacencias. 




Justificaciones
Con el objeto de incorporar al trabajo practico la mayor cantidad de conceptos y herramientas vistas en este modulo, decidí utilizar otras librerías (además de la asignada) para ver como complementarlas.
Por ejemplo el uso de la librería @types/node le da al usuario la posibilidad de ingresar los nodos desde un archivo txt; pero también tiene la opción de ingresarlos manualmente a partir de la librería readlineSync.

Otro ejemplo es el uso de la librería cli-diagram para imprimir un saludo de despedida, ya sea cuando el usuario seleccione la opción de NO generar el grafo (al inicio del programa) como cuando lo genera.
El uso de la función setInterval(), utilizada para demorar 2 segundos la impresión del saludo de despedida: si bien no es una función central para la ejecución del programa (podría haberse ejecutado normalmente sin el uso de esa función), me pareció interesante utilizarla a fin de complementar el tp.
Con respecto a las clases, la clase Data la genere porque la lista de adyacencias ya es un objeto en sí mismo y resultaría más flexible y más abstracto poder manejar esa lista con sus propios métodos y atributos.

La clase Graph es la que construye el grafo. El grafo también es un objeto con sus atributos y métodos (uno de ellos es la lista de adyacencias de tipo Data). Es una clase compuesta, ya que un atributo es del tipo Data. Por lo mencionado anteriormente, resultaría más fácil y más abstracto para el usuario recibir del objeto de tipo Graph su lista de adyacencias (de tipo Data) y con los métodos propios de ese objeto acceder a los valores que contiene y realizar la acción que necesite.