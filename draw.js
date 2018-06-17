Game.scale = 25;

Game.draw = function() {
  for (var d = 0; d < Game.map.length; d++) {
    for (var c = 0; c < Game.map[d].length; c++) {
      for (var r = 0; r < Game.map[d][c].length; r++) {
        if (Game.map[d][c][r] != 0) {
          Game.map[d][c][r].draw();
        }
      }
    }
  }
}
