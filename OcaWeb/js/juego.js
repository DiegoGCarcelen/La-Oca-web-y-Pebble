var jug1;
var juego;

function inicio(){
	colores=["rojo","azul"];
	juego = (new LaOcaFactory(colores)).crearJuego();

	$('#ju1').append('<p id="entrar">Nombre jugador: <input type="text" id="nombre" > <button id="b1">Pedir Ficha</button></p>');
	$('#b1').on('click',function(){
		$('#b1').remove();
		nombre=$('#nombre').val();
		jug1 = new Jugador(nombre,juego);
		jug1.asignarFicha();
		$('#entrar').remove();
		$('#ju1').append('<p>Bienvenido '+jug1.nombre+'</p>');
	})


	$('#ju2').append('<p id="entrar">Nombre jugador: <input type="text" id="nombre" > <button id="b2">Pedir Ficha</button></p>');
	$('#b2').on('click',function(){
		$('#b2').remove();
		nombre2=$('#nombre').val();
		jug2 = new Jugador(nombre2,juego);
		jug2.asignarFicha();
		$('#entrar').remove();
		$('#ju2').append('<p>Bienvenido '+jug2.nombre+'</p>');

	})
}
