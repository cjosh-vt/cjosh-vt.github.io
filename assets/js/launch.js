S(document).ready(function(){
  var hexmap = S.hexmap('board');
  hexmap.positionHexes().resize();

  // Define the content of each hex
  hexmap.setContent(function(id,hex){

    // Define an abstract odds for outcomes 0-12 from rolling two dice
    odds = [0,0,1,2,3,4,5,6,5,4,3,2,1];
    ostr = '';
    // Display circles to represent the odds
    for(var i = 0; i < odds[hex.dice]; i++) ostr += '●'

    // Build the circular token that sits on a hex
    str = '<div class="token'+((hex.dice==8 || hex.dice == 6) ? ' token-red':'')+'">';
    if(hex.n == "Robber"){
      str += 'Robber '+hex.q+','+hex.r;
    }else{
      str += '<div class="id">'+' '+hex.q+','+hex.r+'</div>';
      str += '<div class="dice">'+hex.dice+'</div>';
      str += '<div class="odds">'+ostr+'</div>';
    }
    str += '</div>';

    return str;
  });

  // Set the CSS class of each hex to be the hex type
  hexmap.setClass(function(id,hex){
    return hex.type;
  });

  // Create button which randomises the terrain
  S('#button-8-terrain').on('click',function(){

    // Define the terrain types
    var terrains = ['hills','hills','hills','pasture','pasture','pasture','pasture','mountains','mountains','mountains','fields','fields','fields','fields','forest','forest','forest','forest'];

    // Create an array of terrains to populate
    var t = new Array(hexmap.hexes.length);

    // Randomly assign terrains
    for(var i = 0; i < hexmap.hexes.length; i++){
      t[i] = terrains[Math.floor(Math.random()*terrains.length)];
    }

    // Update all the classes
    for(var i = 0; i < hexmap.hexes.length; i++){
      if(hexmap.hexes[i].n != "Robber") hexmap.hexes[i].setClass(t[i]);
    }
  });
});
