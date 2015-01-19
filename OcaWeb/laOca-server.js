//instalar express en este ejemplo si no lo teníamos

var fs=require("fs");
var io=require("socket.io");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");

var application_root = __dirname,
	path = require('path');

var modulo = require('./server/laOca.js');

var juego;
var tablero;
var jugador;

var app=exp(); //el tutorial indicaba exp.createServer()

//app.use(app.router);
app.use('/',exp.static(__dirname));

app.get("/reset",function(request,response){
	iniJuego();
	var jsonData={
		"fase" : juego.fase.nombre,
		//"jugador" : juego.coleccionJugadores[0].nombre
	};

  	response.header("Access-Control-Allow-Origin", "*");
	response.send(jsonData);
});

app.get("/comenzarPartida",function(req,res){
	var jsonData;
	juego.fase.comienzaJuego();
	jsonData={"Fase":"Jugar"};
	res.header("Access-Control-Allow-Origin", "*");
	//Tiene que devolver algo obligatoriamente 
	res.send(jsonData);
})


app.get("/hayJugadores",function(req,res){
	var jsonData;
	if (juego.coleccionJugadores.length>1){

		juego.setTurno(juego.coleccionJugadores[0]);

		jsonData={"res":"ok"};
	}
	else{
		jsonData={"res":"nook"};
	}

	console.log(jsonData.res);

	res.header("Access-Control-Allow-Origin", "*");
	res.send(jsonData);
});


app.get("/turno/:color",function(req,res){
	var jugador = juego.buscarJugador(req.params.color);
	var jsonData;
	if (jugador){
		jsonData={"turno":jugador.turno.nombre}
	}
	else{
		jsonData={"turno":"fallo"}
	}
	res.header("Access-Control-Allow-Origin", "*");
	res.send(jsonData);
})


app.get("/lanzar/:color",function(req,res){
	var jugador = juego.buscarJugador(req.params.color);
	var jsonData;
	var tirada;
	
	if (jugador){
		tirada = jugador.lanzar();
		console.log('Tirada'+tirada);
		jsonData={
			"posicion":jugador.ficha.casilla.posicion,
			"mensaje" :jugador.ficha.casilla.tema.mensaje,
			"tirada" : tirada
		}
	}
	else{
		jsonData={"res":"error"}
	}

	res.header("Access-Control-Allow-Origin", "*");
	res.send(jsonData);
})


app.set('port', (process.env.PORT || 5000));
//app.listen(port,host);
app.listen(app.get('port'), function() {
  console.log("Node app is  running at localhost:" + app.get('port'));
})


function iniJuego(){

	//if(juego == undefined){

		colores=["rojo","azul","verde","amarillo","violeta","negro","blanco","marron"];
		juego = (new modulo.LaOcaFactory(colores)).crearJuego();
		jugador = undefined;

		console.log("Juego Reseteado");		

	//}
	//else{
	
	//	console.log("Ha entrado jugador 2");
	//}

}

app.get("/",function(request,response){

	if(juego == undefined){

		var contenido=fs.readFileSync("./index.html");
		response.setHeader("Content-type","text/html");
		response.header("Access-Control-Allow-Origin", "*");
		response.send(contenido);
	}else{
		var contenido=fs.readFileSync("./index.html");
		response.setHeader("Content-type","text/html");
		response.header("Access-Control-Allow-Origin", "*");
		response.send(contenido);
	}


});

app.get("/ficha/:nombre",function(request,response){
	jugador = new modulo.Jugador(request.params.nombre,juego);
	jugador.asignarFicha();
	if (jugador.ficha){
        var jsonData={
            "color":jugador.ficha.color,
            "posicion":jugador.ficha.casilla.posicion
        };
        response.header("Access-Control-Allow-Origin", "*");
        response.send(jsonData);
    }
    else{
    	response.header("Access-Control-Allow-Origin", "*");
        response.send("No hay mas huecos, espera la siguiente partida");
    }
})

app.get("/jugadores",function(request,response){

	var jsonData={"numJug":juego.coleccionJugadores.length};	

	response.header("Access-Control-Allow-Origin", "*");
    response.send(jsonData);
})

app.get("/ju/:num",function(request,response){
	var jsonData={"pos":juego.coleccionJugadores[request.params.num].ficha.casilla.posicion}
	response.header("Access-Control-Allow-Origin", "*");
    response.send(jsonData);
})

/*
var socket = io.listen(server);
var coleccion =[];
socket.on('connection',function(client){
	client.on('listo',function(data){
		coleccion.push(data);
		if (coleccion.length==juego.coleccionFichas.length){
			socket.emit("go",{juego:"ok"});
		}
	})
})
*/


