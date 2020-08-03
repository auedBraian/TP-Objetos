"use strict";
exports.__esModule = true;
var fs = require("fs");
var readlineSync = require('readline-sync'); //esta libreria la utilizo para ingresar valores por teclado
var undirender = require('undirender'); //esta libreria la utilizo para dibujar el grafo
var Diagram = require('cli-diagram'); //esta libreria la utilizo para generar el mensaje final 
var Graph = /** @class */ (function () {
    function Graph(alto, ancho, informacion) {
        this.information = informacion;
        this.width = ancho;
        this.heigth = alto;
    }
    Graph.prototype.setWidth = function (ancho) {
        this.width = ancho;
    };
    Graph.prototype.getWidth = function () {
        return this.width;
    };
    Graph.prototype.setHeigth = function (alto) {
        this.heigth = alto;
    };
    Graph.prototype.getHeigth = function () {
        return this.heigth;
    };
    Graph.prototype.getInformation = function () {
        return this.information;
    };
    Graph.prototype.getGraph = function (ancho, alto, datos) {
        if (ancho === void 0) { ancho = this.getWidth(); }
        if (alto === void 0) { alto = this.getHeigth(); }
        if (datos === void 0) { datos = this.getInformation().getData(); }
        var s = undirender(ancho, alto, datos);
        console.log(s);
    };
    return Graph;
}());
var Data = /** @class */ (function () {
    function Data(informacion) {
        this.data = informacion;
    }
    Data.prototype.setData = function (datos) {
        this.data = datos;
    };
    Data.prototype.getData = function () {
        return this.data;
    };
    return Data;
}());
var FileManager = /** @class */ (function () {
    function FileManager(location) {
        var txtFile = fs.readFileSync(location, 'utf8');
        this.stringArray = txtFile.split(',');
    }
    FileManager.prototype.printStringArray = function () {
        console.log('StringArray content: ' + this.stringArray);
    };
    FileManager.prototype.getStringArray = function () {
        return this.stringArray;
    };
    return FileManager;
}());
//Esta funcion la utilizo para insertar alto, ancho y cantidad de escalas
function insertNumber(NumVar) {
    NumVar = readlineSync.questionInt("");
    return NumVar;
}
//Esta funcion la utilizo para insertar el origen del vuelo con sus distintas esacalas
function insertStopover(stOvArray, Qstops) {
    for (var i = 0; i < Qstops; i++) {
        var a = readlineSync.question();
        stOvArray.push(a);
    }
    return stOvArray;
}
//En esta funcion genero los nodos que va a recibir el grafo
function createInformativeArray() {
    var Qstops;
    console.log("How many stops does your fligth have? ");
    Qstops = insertNumber(Qstops);
    console.log("insert stops in this way -->Origin, Stopover-1,Stopover-2,Stopover3,...StopoverN");
    var infoArray = [];
    infoArray = insertStopover(infoArray, Qstops);
    var informationArray = [];
    for (var i = 0; i < (infoArray.length - 1); i++) {
        var a = infoArray[i];
        var b = infoArray[i + 1];
        var stopoversArray = [];
        stopoversArray.push(a);
        stopoversArray.push(b);
        informationArray.push(stopoversArray);
    }
    return informationArray;
}
// esta funcion genero los nodos que va a recibir el grafo a partir de un archivo txt
function getInformativeArray() {
    var info = 'trip.txt';
    var txtFile = new FileManager(info);
    var infoArray = [];
    infoArray = txtFile.getStringArray();
    var informationArray = [];
    for (var i = 0; i < (infoArray.length - 1); i++) {
        var tempArray = [];
        var a = infoArray[i];
        var b = infoArray[i + 1];
        tempArray.push(a);
        tempArray.push(b);
        informationArray.push(tempArray);
    }
    return informationArray;
}
function printPlatform() {
    var contador = 2;
    var intervalo = setInterval(function (e) {
        if (contador === 0) {
            var platform = Math.floor((Math.random() * 50) + 1);
            var myDiagram = new Diagram();
            myDiagram.box("Your flight departs from platform " + platform).line(1).box("Have a nice trip!");
            console.log(myDiagram.draw());
            clearInterval(intervalo);
        }
        else {
            contador--;
        }
    }, 1000);
}
//inicia programa
var variableDeControl = readlineSync.questionInt("Press 1 to create the graph of your flight, or any other value to exit ");
if (variableDeControl == 1) {
    var information = void 0;
    var variableDeControl2 = readlineSync.questionInt("Press 1 to insert stopovers by keyboard, press 2 to insert stopovers by txt file ");
    if (variableDeControl2 == 1) {
        //creo los nodos que va a recibir el grafo
        information = new Data(createInformativeArray());
    }
    else if (variableDeControl2 == 2) {
        //a partir de un archivo txt, recibe los nodos que va a recibir el grafo
        information = new Data(getInformativeArray());
    }
    var graphWidth = void 0;
    var graphHeigth = void 0;
    //Inserto ancho del grafo
    console.log("Insert graph Witdth ");
    graphWidth = insertNumber(graphWidth);
    //Inserto alto del grafo
    console.log("Insert graph Heigth ");
    graphHeigth = insertNumber(graphHeigth);
    // envio los datos de alto, ancho y los nodos con los que voy a construir el grafo
    var grafico = new Graph(graphWidth, graphHeigth, information);
    console.log("Creating graph.. ");
    //Imprimo el grafo
    grafico.getGraph();
    //Imprimo un cartel donde dice la plataforma desde la que despega el avion y un saludo
    printPlatform();
}
if (variableDeControl != 1) {
    var goodByeDiagram = new Diagram();
    goodByeDiagram.box("Thank for your visit").line(1).box("Come back soon!");
    console.log(goodByeDiagram.draw());
}
