function createMap(depth, columns, rows) {
  var map = new Array(depth);
  for (var d = 0; d < depth; d++) {
    map[d] = new Array(columns);
    for (var c = 0; c < columns; c++) {
      map[d][c] = new Array(rows);
      for (var r = 0; r < rows; r++) {
        map[d][c][r] = 0;
      }
    }
  }
  return map
}

Game.map = createMap(3, 10, 10);
console.log(Game.map);
