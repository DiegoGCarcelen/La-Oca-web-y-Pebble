/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var color;


var main = new UI.Card({
  title: 'Oca Pebble',
  icon: 'images/menu_icon.png',
  subtitle: 'UCLM',
  body: 'Procesos de Ingenieria de Software'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'OcaPebble',
        icon: 'images/menu_icon.png',
        subtitle: 'Version 0.9'
      }, {
        title: 'Resetar partida',
        subtitle: ' ',        
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  
  menu.show();
});

//Pedir ficha
main.on('click', 'select', function(e) {
  var card = new UI.Card();
  card.title('Pidiendo ficha...');
  card.subtitle('Espera...');
  card.body(' ');
  card.show();
  
  ajax(
    {
      url:'http://calm-spire-1733.herokuapp.com/ficha/PebblePlayer',
      method: 'get',
      type: 'json'
    },
    
  function(data) {
    // Success!
    console.log(data.color);
    console.log(data.posicion);
    
    card.subtitle('Color asignado');
    card.body('Se te ha asignado el color '+data.color);
    color = data.color;
    
  },
function(error) {
  // Failure!
  console.log('no response');
  card.subtitle('Se ha producido un error');
}
);
  
  
});

//Lanzar
main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('Tirada');
  card.show();
  
  ajax(
    {
      url: 'http://calm-spire-1733.herokuapp.com/lanzar/'+color,
      method: 'get',
      type: 'json'
    },
    
  function(data) {
    // Success!
    console.log(data.tirada);
    
    if(data.tirada == 0){
      card.title('Aun no es tu turno');
      card.subtitle(' ');
      card.body(' ');
      card.show();
      
    }else{
      card.title('Tirada: '+data.tirada);
      card.subtitle('Te mueves a la casilla '+data.posicion);
      card.body(data.mensaje);
      card.show();
    }
    
  },
function(error) {
  // Failure!
  card.title('Error de conexión');
  console.log('no response');
}
);
 
});
