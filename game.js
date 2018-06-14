
var Game = {"currentScene": 0, "scenes": [], "elements": {"void" : 1,
                                                          "player" : 2,
                                                          "sand": 3,
                                                          "water": 4}};

Game.player = new Character (0, 0);

function Character(x, y) {
  this.x = x;
  this.y = y;

  this.spawn = function() {
    Game.map[this.x][this.y] = Game.elements.player;
  };

  this.move = function(vector) {
    Game.map[this.x][this]
  }
}

Game.draw = function(scale) {
  for (var c = 0; c < Game.map.length; c++) {
      for (var r = 0; r < Game.map[c].length; r++) {
        switch(Game.map[c][r]) {
          case Game.elements.void:
            screen.fillStyle = "white";
          break;
          case Game.elements.sand:
            screen.fillStyle = "#EDC9B0";
          break;
          case Game.elements.water:
            screen.fillStyle = "#5abcd8";
          break;
          case Game.elements.player:
            screen.fillStyle = "black";
          default:

        }
        screen.fillRect(c*scale, r*scale, scale, scale);
      }
  }
};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: //Left
            Game.map[Game.player.x][Game.player.y] = Game.elements.void;
            Game.player.x -= 1;
            Game.map[Game.player.x][Game.player.y] = Game.elements.player;
            break;
        case 38: // Up
            Game.map[Game.player.x][Game.player.y] = Game.elements.void;
            Game.player.y -= 1;
            Game.map[Game.player.x][Game.player.y] = Game.elements.player;
            break;
        case 39: // Right
            Game.map[Game.player.x][Game.player.y] = Game.elements.void;
            Game.player.x += 1;
            Game.map[Game.player.x][Game.player.y] = Game.elements.player;
            break;
        case 40: // Down
            Game.map[Game.player.x][Game.player.y] = Game.elements.void;
            Game.player.y += 1;
            Game.map[Game.player.x][Game.player.y] = Game.elements.player;
            break;
    }
};

function Element(color) {

}

Game.gravity = function() {
  for (var c = 0; c < Game.map.length; c++) {
    for (var r = 0; r < Game.map[c].length; r++) {
      if (Game.map[c][r] != Game.elements.void && Game.map[c][r+1] == Game.elements.void)  {
        Game.map[c][r+1] = Game.map[c][r];
        Game.map[c][r] = Game.elements.void;
      }
    }
  }
};


Game.selectedElement = "";

Game.chemistry = function(elementA, elementB) {
  if (elementA == Game.elements["water"] && elementB == Game.elements["sand"]) {
    return Game.elements["wetsand"];
  }
  switch (elementA){
    case Game.elements["water"]:
      if (elementB == Game.elements["sand"]) {
        return Game.elements["wetsand"];
      }
    case Game.elements["sand"]:
      if (elementB == Game.elements["water"]) {
        return Game.elements["wetsand"];
      }
     break;
  }
};

canvas.addEventListener("click", function(e){
  Game.map[Math.floor(e.clientX / Game.scale)][Math.floor(e.clientY / Game.scale)] = Game.chemistry(Game.elements["water"], Game.map[Math.floor(e.clientX / Game.scale)][Math.floor(e.clientY / Game.scale)]);
});

Game.run = function() {
  Game.gravity();
  Game.draw(Game.scale);
}

Game.scale = 50;

Game.id = setInterval("Game.run()", 100);

Game.generateMap = function(width, height) {
  map = new Array(width);
  for (var c = 0; c < width; c++) {
      map[c] = new Array(height);
      for (var r = 0; r < height; r++) {
        rand = Math.round(Math.random() * 2);
        if (rand == 2){
            map[c][r] = Game.elements.sand;
        } else if (rand == 1) {
            map[c][r] = Game.elements.void;
        } else {
            map[c][r] = Game.elements.water;
        }
      }
  }
  return map;
};

Game.map = Game.generateMap(10, 10);
Game.player.spawn();

//screen.fillStyle = "#D9361B";
//screen.fillRect(0, 0, 100, 100);

/* Documentation
________________________
 */

/*function Editor() {
  this.selectedColor = "black";
  this.layout = ["c","c","c","c","p"];
  this.elements = {"p": new Palette(["#fe4880", "#c6427b", "#8e3c77", "#563672", "#1e306e"], this), "c" : new Canvas(this)};

  this.click = function(x, y) {
    for (var element in this.elements) {
      if (this.elements.hasOwnProperty(element)) {
        if (this.elements[element].x <= x) {
          this.elements[element].click(x, y);
        }
      }
    }
  };

  this.draw = function() {
    for (var i = 0; i < this.layout.length; i++) {
      if (this.layout[i] != "") {
        if (this.elements[this.layout[i]].x === undefined) {
            this.elements[this.layout[i]].x = canvas.width / this.layout.length * i;
        }
        this.elements[this.layout[i]].y += 0;
        this.elements[this.layout[i]].width += canvas.width / this.layout.length;
        this.elements[this.layout[i]].height = canvas.height;
        this.elements[this.layout[i]].draw();
      }
      else {
        continue;
      }
    }
  };


}

function Canvas(parent) {
  this.x = undefined;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.brushSize = 20;
  this.paint = undefined;
  this.editor = parent;

  this.draw = function() {
    screen.fillStyle = "rgb(240, 240, 240)";
    screen.fillRect(this.x, this.y, this.width, this.height);
  };

  this.click = function(x, y) {
    var brushStroke;
    console.log("click");
    screen.fillStyle = this.editor.selectedColor;
    screen.strokeStyle = this.editor.selectedColor;
    screen.fillRect(Math.floor(x  / this.brushSize) * this.brushSize, Math.floor(y / this.brushSize) * this.brushSize, this.brushSize, this.brushSize);
    screen.strokeRect(Math.floor(x  / this.brushSize) * this.brushSize, Math.floor(y / this.brushSize) * this.brushSize, this.brushSize, this.brushSize);
    brushStroke = {"color" : this.editor.selectedColor, "size": this.brushSize, "x" : x, "y" : y};
  };
}

function Palette(colors, parent) {
  this.x = undefined;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.colors = colors;
  this.editor = parent;

  this.draw = function() {
    for (var color = 0; color < this.colors.length; color++) {
      screen.fillStyle = this.colors[color];
      screen.fillRect(this.x, this.y + color * canvas.height / this.colors.length, this.width, this.height / this.colors.length);
    }
  };

  this.click = function(x, y) {
    for (var color = 0; color < this.colors.length; color++) {
      if (y >= this.y + color * canvas.height / this.colors.length && y < this.y + color * canvas.height / this.colors.length + canvas.height / this.colors.length ){
          this.editor.selectedColor = colors[color];
      }
    }
  };
}

canvas.addEventListener("click", function(e) {
  Game.scenes[Game.currentScene].click(e.clientX - 5, e.clientY - 5);
}); */
