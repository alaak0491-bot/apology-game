let dragged = null;

function startGame(){
  document.getElementById("start").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  createPuzzle();
}

function createPuzzle(){
  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";

  let pieces = [];

  for(let i=0;i<16;i++){
    pieces.push(i);
  }

  pieces = shuffle(pieces);

  pieces.forEach(pos=>{
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.draggable = true;

    tile.dataset.correct = pos;

    let x = (pos % 4) * 80;
    let y = Math.floor(pos / 4) * 80;

    tile.style.backgroundPosition = `-${x}px -${y}px`;

    tile.addEventListener("dragstart", () => {
      dragged = tile;
    });

    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    tile.addEventListener("drop", () => {
      if(dragged && dragged !== tile){
        swapTiles(dragged, tile);
        checkWin();
      }
    });

    puzzle.appendChild(tile);
  });
}

function swapTiles(a, b){
  let temp = a.style.backgroundPosition;
  a.style.backgroundPosition = b.style.backgroundPosition;
  b.style.backgroundPosition = temp;

  let tempData = a.dataset.correct;
  a.dataset.correct = b.dataset.correct;
  b.dataset.correct = tempData;
}

function checkWin(){
  const tiles = document.querySelectorAll(".tile");

  let win = true;

  tiles.forEach((t,i)=>{
    let x = (i % 4) * 80;
    let y = Math.floor(i / 4) * 80;

    if(t.style.backgroundPosition !== `-${x}px -${y}px`){
      win = false;
    }
  });

  if(win){
    document.getElementById("game").classList.add("hidden");
    document.getElementById("win").classList.remove("hidden");
  }
}

function showTreaty(){
  document.getElementById("win").classList.add("hidden");
  document.getElementById("treaty").classList.remove("hidden");
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    let j = Math.floor(Math.random()*i);
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}
