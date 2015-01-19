describe("El juego de la oca...",function(){
     
     var juego;
     var coleccionFichas;
     var tablero;
     var jugador; 

	describe("En cuanto a la inicialización",function(){

		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero,this.coleccionFichas);

			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.juego.setTurno(this.ju1);
		})


		it("...la variable juego debe estar definida",function(){
			expect(this.juego).toBeDefined();
		})

		it("...la variable juego debe tener un tablero",function(){
			expect(this.juego.tablero).toBeDefined();
		})

		it("...la variable juego debe tener 64 elementos",function(){
			expect(this.juego.tablero.casillas.length).toEqual(64);
		})

		it("...el juego tiene una coleccion de fichas", function(){
			expect(this.juego.coleccionFichas).toBeDefined();
		})

		it("...la coleccion de fichas debe tener 3 fichas", function(){
			expect(this.juego.coleccionFichas.length).toEqual(3);
		})

		it("...inicialmente todas las ficha están libres", function(){

			var resul=false;

			for(ficha=0;ficha<this.juego.coleccionFichas.length;ficha++){
				if(!(this.juego.coleccionFichas[1].libre)){
					resul=true;
				};
			}

			expect(resul).toBe(false);
		})

		it("...el juego tiene una coleccion de jugadores", function(){
			expect(this.juego.coleccionJugadores).toBeDefined();
		})

		it("...el juego permite crear un jugador llamado Pepe", function(){

			expect(this.ju1.nombre).toEqual("Pepe");

		})

		it("...el juego permite asignar una ficha libre a Pepe", function(){
			
			expect(this.ju1.ficha).toBeDefined();


		})

	})

	describe("En cuanto al dado...",function(){

		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero,this.coleccionFichas);
			
			this.ju1 = new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.juego.setTurno(this.ju1);

			this.valores=[1,2,3,4,5,6];
		})

		it("...el resultado es un número del 1 al 6", function(){
			expect(this.valores.indexOf(this.ju1.lanzar())).not.toEqual(-1); 
		})

	})

	describe("En cuanto al tablero...",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);

		});

		it("...las casillas 6 y 12 tienen Puente",function(){
			expect(this.tablero.casillas[6].tema.titulo).toEqual("Puente");
			expect(this.tablero.casillas[12].tema.titulo).toEqual("Puente");
		});

		it("...la casilla 19 tiene una Posada",function(){
			expect(this.tablero.casillas[19].tema.titulo).toEqual("Posada");
		});

		it("...las casillas 26 y 53 tiene Dados", function(){
			expect(this.tablero.casillas[26].tema.titulo).toEqual("Dados");
			expect(this.tablero.casillas[53].tema.titulo).toEqual("Dados");
		});

		it("...la casilla 46 tiene Laberinto", function(){
			expect(this.tablero.casillas[46].tema.titulo).toEqual("Laberinto");
		});

		it("...la casilla 52 tiene Cárcel", function(){
			expect(this.tablero.casillas[52].tema.titulo).toEqual("Carcel");
		});

		it("...la casilla 58 tiene Calavera", function(){
			expect(this.tablero.casillas[58].tema.titulo).toEqual("Calavera");
		});

		it("...las casillas 5,9,14,18,23,27,32, 36, 41, 45, 50, 54, 59 tienen Oca",function(){
			expect(this.tablero.casillas[5].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[9].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[14].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[18].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[23].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[27].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[32].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[36].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[41].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[45].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[50].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[54].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[59].tema.titulo).toEqual("Oca");

		});

	})

	describe("En cuanto al funcionamiento del tema Oca",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);

			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.juego.setTurno(this.ju1);

		});

		it("...las casilla 5 lleva al jugador a la casilla 9",function(){
			this.ju1.ficha.avanzar(4);
			expect(this.ju1.ficha.casilla.posicion).toEqual(9);
		});

		it("...las casilla 9 lleva al jugador a la casilla 14",function(){
			this.ju1.ficha.avanzar(8);
			expect(this.ju1.ficha.casilla.posicion).toEqual(14);
		});

		it("...las casilla 14 lleva al jugador a la casilla 18",function(){
			this.ju1.ficha.avanzar(13);
			expect(this.ju1.ficha.casilla.posicion).toEqual(18);
		});

		it("...las casilla 18 lleva al jugador a la casilla 23",function(){
			this.ju1.ficha.avanzar(17);
			expect(this.ju1.ficha.casilla.posicion).toEqual(23);
		});

		it("...las casilla 23 lleva al jugador a la casilla 27",function(){
			this.ju1.ficha.avanzar(22);
			expect(this.ju1.ficha.casilla.posicion).toEqual(27);
		});

		it("...las casilla 27 lleva al jugador a la casilla 32",function(){
			this.ju1.ficha.avanzar(26);
			expect(this.ju1.ficha.casilla.posicion).toEqual(32);
		});

		it("...las casilla 32 lleva al jugador a la casilla 36",function(){
			this.ju1.ficha.avanzar(31);
			expect(this.ju1.ficha.casilla.posicion).toEqual(36);
		});

		it("...las casilla 36 lleva al jugador a la casilla 41",function(){
			this.ju1.ficha.avanzar(35);
			expect(this.ju1.ficha.casilla.posicion).toEqual(41);
		});

		it("...las casilla 41 lleva al jugador a la casilla 45",function(){
			this.ju1.ficha.avanzar(40);
			expect(this.ju1.ficha.casilla.posicion).toEqual(45);
		});

		it("...las casilla 45 lleva al jugador a la casilla 50",function(){
			this.ju1.ficha.avanzar(44);
			expect(this.ju1.ficha.casilla.posicion).toEqual(50);
		});

		it("...las casilla 50 lleva al jugador a la casilla 54",function(){
			this.ju1.ficha.avanzar(49);
			expect(this.ju1.ficha.casilla.posicion).toEqual(54);
		});

		it("...las casilla 54 lleva al jugador a la casilla 59",function(){
			this.ju1.ficha.avanzar(53);
			expect(this.ju1.ficha.casilla.posicion).toEqual(59);
		});

		it("...las casilla 59 lleva al jugador a la casilla 63",function(){
			this.ju1.ficha.avanzar(58);
			expect(this.ju1.ficha.casilla.posicion).toEqual(63);
		});

	})

	describe("En cuanto a las casillas de pérdida de turnos...",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);

			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.juego.setTurno(this.ju1);
		});

		it("...si el jugador cae en la posada pierde 2 turnos",function(){
			this.ju1.ficha.avanzar(18);
			expect(this.ju1.ficha.turnos).toEqual(2);
		});

		it("...si el jugador cae en la cárcel pierde 3 turnos",function(){
			this.ju1.ficha.avanzar(51);
			expect(this.ju1.ficha.turnos).toEqual(3);
		});

		it("...si el jugador cae en el laberinto pierde 5 turnos",function(){
			this.ju1.ficha.avanzar(45);
			expect(this.ju1.ficha.turnos).toEqual(5);
		});

	})

	describe("En cuanto al cambio de turno...",function(){

		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);

			this.ju1=new Jugador("Pepe",this.juego);
			this.ju1.asignarFicha();
			this.juego.setTurno(this.ju1);

			this.ju2=new Jugador("Luis",this.juego);
			this.ju2.asignarFicha();

		});

		it("...si el jugador cae en casilla normal se cambia turno",function(){
			if(this.ju1.ficha.avanzar(1)){
				this.ju1.juego.cambiarTurno(this.ju1);
			}
			expect(this.juego.turno).toEqual(this.ju2);
		});

		it("...si el jugador cae en oca no pierde el turno",function(){
			this.ju1.ficha.avanzar(4);
			expect(this.juego.turno).toEqual(this.ju1);
		});

		it("...si el jugador cae en dados no pierde el turno", function(){
			this.ju1.ficha.avanzar(52);
			expect(this.juego.turno).toEqual(this.ju1);

		});

	})
  
})
