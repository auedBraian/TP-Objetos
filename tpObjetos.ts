import * as fs from 'fs';

var readlineSync = require('readline-sync'); //esta libreria la utilizo para ingresar valores por teclado
var undirender = require('undirender');//esta libreria la utilizo para dibujar el grafo
var Diagram = require('cli-diagram');//esta libreria la utilizo para generar el mensaje final 

class Graph {

    private width: number; 
    private heigth: number; 
    private information: Data;

    public constructor(alto: number, ancho: number, informacion: Data) {
        this.information = informacion;
        this.width = ancho;
        this.heigth = alto;
    }

    public setWidth(ancho: number): void {
        this.width = ancho;
    }

    public getWidth(): number {
        return this.width;
    }

    public setHeigth(alto: number): void {
        this.heigth = alto;
    }

    public getHeigth(): number {
        return this.heigth;
    }

    public getInformation(): Data {
        return this.information;
    }

    public getGraph(ancho: number = this.getWidth(), alto: number = this.getHeigth(), datos: Array<Array<String>> = this.getInformation().getData()): void {

        var s = undirender(ancho, alto, datos);
        console.log(s);
    }

}


class Data {

    private data: Array<Array<String>>;

    public constructor(informacion: Array<Array<String>>) {

        this.data = informacion;
    }

    public setData(datos: Array<Array<String>>):void {
        this.data = datos;
    }

    public getData(): Array<Array<String>> {
        return this.data;
    }

}

class FileManager {
    
    private stringArray: string[];
    
    constructor(location: string) { 
        let txtFile: string = fs.readFileSync(location, 'utf8');
        this.stringArray = txtFile.split(',');
    } 

    public printStringArray():void{
        console.log('StringArray content: '+ this.stringArray);
    }

    public getStringArray():string[]{
        return this.stringArray;
    }
}


//Esta funcion la utilizo para insertar alto, ancho y cantidad de escalas
function insertNumber(NumVar: number): number {
    NumVar = readlineSync.questionInt("");
    return NumVar;
}

//Esta funcion la utilizo para insertar el origen del vuelo con sus distintas esacalas
function insertStopover(stOvArray:string[], Qstops:number):string[]{
    for(let i:number = 0; i<Qstops;i++){
        let a:string = readlineSync.question();
        stOvArray.push(a);
    }
    return stOvArray;
}


//En esta funcion genero los nodos que va a recibir el grafo
function createInformativeArray(): Array<Array<String>> {

    let Qstops: number;

    console.log("How many stops does your fligth have? ");
    Qstops = insertNumber(Qstops);
   
    console.log("insert stops in this way -->Origin, Stopover-1,Stopover-2,Stopover3,...StopoverN");
    let infoArray: string[] = [];

    infoArray=insertStopover(infoArray,Qstops);
    let informationArray: Array<Array<String>> = [];

    for (let i: number = 0; i <(infoArray.length-1) ; i++) {
        let a: string = infoArray[i]
        let b: string = infoArray[i + 1]
        let stopoversArray: string[] = [];
        stopoversArray.push(a);
        stopoversArray.push(b);
        informationArray.push(stopoversArray);
    }

    return informationArray;

}


// esta funcion genero los nodos que va a recibir el grafo a partir de un archivo txt
function getInformativeArray(): Array<Array<String>> {

    let info: string ='trip.txt'; 
    let txtFile:FileManager = new FileManager(info);
    let infoArray:string[]=[];
    infoArray =txtFile.getStringArray();
    let informationArray: Array<Array<String>> = [];

    for (let i: number = 0; i <(infoArray.length-1) ; i++) {

        let tempArray: string[] = [];
        let a: string = infoArray[i]
        let b: string = infoArray[i + 1]
        tempArray.push(a);
        tempArray.push(b);
        informationArray.push(tempArray);
    }
    
    return informationArray;
}


function printPlatform(): void {
    let contador = 2;
    let intervalo = setInterval(function (e) {
        if (contador === 0) {
            let platform: number = Math.floor((Math.random() * 50) + 1);
            let myDiagram = new Diagram();
            myDiagram.box(`Your flight departs from platform ` + platform).line(1).box(`Have a nice trip!`);
            console.log(myDiagram.draw());
            clearInterval(intervalo);
        }
        else {
            contador--;
        }
    }, 1000);
}




//inicia programa
let variableDeControl: number = readlineSync.questionInt("Press 1 to create the graph of your flight, or any other value to exit ");

if (variableDeControl == 1) {

    let information: Data;

    let variableDeControl2: number = readlineSync.questionInt("Press 1 to insert stopovers by keyboard, press 2 to insert stopovers by txt file ");

    if (variableDeControl2 == 1) {
        //creo los nodos que va a recibir el grafo
        information = new Data(createInformativeArray());
    }

    else if (variableDeControl2 == 2) {
        //a partir de un archivo txt, recibe los nodos que va a recibir el grafo
        information = new Data(getInformativeArray());
    }

    let graphWidth: number;

    let graphHeigth: number;

    //Inserto ancho del grafo
    console.log("Insert graph Witdth ");
    graphWidth = insertNumber(graphWidth);

    //Inserto alto del grafo
    console.log("Insert graph Heigth ");
    graphHeigth = insertNumber(graphHeigth);

    // envio los datos de alto, ancho y los nodos con los que voy a construir el grafo
    let grafico: Graph = new Graph(graphWidth, graphHeigth, information);

    console.log("Creating graph.. ");

    //Imprimo el grafo
    grafico.getGraph();

    //Imprimo un cartel donde dice la plataforma desde la que despega el avion y un saludo
    printPlatform();

}
if (variableDeControl != 1) {

    let goodByeDiagram = new Diagram();
    goodByeDiagram.box(`Thank for your visit`).line(1).box(`Come back soon!`);
    console.log(goodByeDiagram.draw());
}


//AGREGO ESTA LINEA SOLO PARA QUE GIT NOTE CAMBIOS Y ME DEJE HACER EL PULL REQUEST
