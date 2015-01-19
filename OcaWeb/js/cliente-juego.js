var url="http://calm-spire-1733.herokuapp.com/";
//var url="http://127.0.0.1:2444/"
var intervaloInicio;
var intervaloJugadores;
var color;
var numeroJugadores;
var colores=["rojo","azul","verde","amarillo","violeta","negro","blanco","marron"];
var posiciones=[1,1,1,1,1,1,1,1];


//var socket = io(url);

var arrayPosiciones =[
	//1 a 5
	[-100,450],[-170,450],[-243,450],[-320,450],[-380,450],
	//6 a 10
	[-440,430],[-507,420],[-560,390],[-590,330],[-630,270],
	//11 a 15
	[-630,210],[-630,150],[-630,70],[-630,0],[-630,-90],
	//16 a 20
	[-630,-150],[-610,-210],[-580,-250],[-540,-300],[-500,-350],
	//21 a 25
	[-450,-380],[-390,-400],[-320,-380],[-260,-380],[-220,-340],
	//26 a 30
	[-150,-320],[-120,-250],[-100,-190],[-100,-130],[-100,-60],
	//31 a 35
	[-100,10],[-100,80],[-120,150],[-130,200],[-170,250],
	//36 a 40
	[-220,300],[-260,340],[-330,350],[-390,350],[-450,330],
	//41 a 45
	[-490,300],[-510,240],[-520,170],[-520,100],[-520,40],
	//46 a 50
	[-520,-40],[-520,-120],[-510,-160],[-500,-230],[-460,-270],
	//51 a 55
	[-400,-290],[-330,-295],[-260,-290],[-230,-220],[-200,-180],
	//56 a 60
	[-200,-100],[-200,-30],[-200,40],[-200,100],[-200,160],
	//61 a 63
	[-250,200],[-300,230],[-360,260]
];

//Sockets
//function esperarAlResto(){
//	socket.on('go',function(){
//		mostrarBotonEmpezar();
//	})
//}

function hayJugadores(){

	$.getJSON(url+"hayJugadores",function(data){
		if (data.res=="ok"){
			clearInterval(intervaloInicio);
			mostrarBotonEmpezar();
			
		}
	})

	intervaloJugadores = setInterval("mostrarJugadores()", 3000);

}

function reset(){
	$.getJSON(url + "reset",function(data){
		//$('#partida').append("<p id='fase' >"+"Estás en la fase "+data.fase+"</p>");
		$('#evento').html("<p id='evento' >"+"</p>");
	})
}

function lanzar(){

	$.getJSON(url+"lanzar/"+color,function(data){
		$('#evento').html("<p id='evento' >"+"Tirada: "+data.tirada+"</p>");
		$('#evento').append("<p id='evento' >"+"Te mueves a la casilla: "+data.posicion+"</p>");
		$('#evento').append("<p id='evento' >"+data.mensaje+"</p>");
		moverFicha(color,data.posicion);
	})

}

function turno(){
	$.getJSON(url+"turno/"+color,function(data){
		if (data.turno=="MeToca"){
			//$('#ju1').append("<p>Turno: "+data.turnoº+"</p>")
			$('#ju1').html(" ");
			$('#lanzar').html("<button id='lanzar' type='button' onclick='lanzar()'> ¡Lanzar! </button>");
		}
		else{
			$('#ju1').html("Esperando que el contrincante lance")
			$('#lanzar').html("<div id='lanzar'></div>");
		}
	})
}


function ficha(nombre){
	$.getJSON(url+'ficha/'+nombre,function(data){
		color=data.color;
		mostrarColor(data.color);
	})
}

function mostrarJugadores(){
	$.getJSON(url+"jugadores",function(data){
		$('#jugadores').html("Hay ahora mismo "+ data.numJug +" jugadores.");
		numeroJugadores = data.numJug;
	})
}


function pedirFicha(){
	$('#pedirBtn').remove(); 
	ficha($('#nombre').val());
	$('#pedir').html("<p> Hola, "+ $('#nombre').val() +"</p>");
	
}

function mostrarColor(color){
	//$('#pedir').remove();
	$('#ju1').append("Ficha: "+color);
	//Sockets
	//socket.emit('listo',color);
	//esperarAlResto();

	//Pooling
	intervaloInicio = setInterval("hayJugadores()", 3000);
}

function mostrarBotonEmpezar(){
	$('#ju1').append("<p id='emp'><button id='empezar'>¡A jugar!</button></p>");
	$('#empezar').on("click",function(){
		$('#emp').remove();
		turno();
		intervaloInicio = setInterval("turno()", 3000);
		clearInterval(intervaloJugadores);
		//Comenzar partida
		$.getJSON(url+'comenzarPartida',function(data){})
	})
}

function moverFicha(colorPos,casilla){

	//El Offset ajusta gráficamente las fichas
	var offset;
	switch(colorPos){
		case "rojo":
			offset = 0;
			break

		case "verde":
			offset = 1;
			break

		case "azul":
			offset = 2;
			break

		case "amarillo":
			offset = 3;
			break

		case "violeta":
			offset = 5;
			break

		case "blanco":
			offset = 6;
			break

		case "negro":
			offset = 7;
			break

		case "marron":
			offset = 8;
			break

		default:
			offset = 0;
	}
	
	$('#'+colorPos).css({position:"relative",top:(arrayPosiciones[casilla-1][0])-(50*offset),left:arrayPosiciones[casilla-1][1]});

	//console.log("Muevo la ficha "+ colorPos +" a la posicion "+ casilla);
}

//Asíncrona, no funciona bien, no se utiliza en esta versión
function actualizaFichas(){

	var i = 0;
	
	while(i<numeroJugadores){
		$.getJSON(url+"ju/"+i,function(data){
			 posiciones[i]=data.pos;
			 console.log("La casilla es "+ posiciones[i]);

		})
			moverFicha(colores[i],posiciones[i]);
		i++;
	}

}







