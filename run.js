Game.run = function() {
  Game.draw();
}

Game.id = setInterval("Game.run()", 100);
