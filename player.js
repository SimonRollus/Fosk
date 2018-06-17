Game.player = new Character(0, 0, 0);

function Character(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.spawn = function() {
    Game.map[this.z][this.x][this.y] = this;
  }

  this.draw = function() {
    screen.fillStyle = "black";
    screen.fillRect(this.x, this.y, Game.scale, Game.scale);
  }

  this.gravity = function
}

Game.player.spawn();
