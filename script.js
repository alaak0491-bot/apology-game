let dragged = null;

const images = [
  "1.jpg","2.jpg","3.jpg","4.jpg",
  "5.jpg","6.jpg","7.jpg","8.jpg",
  "9.jpg","10.jpg","11.jpg","12.jpg",
  "13.jpg","14.jpg","15.jpg","16.jpg"
];

function startGame(){
  document.getElementById("start").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  createPuzzle();
}

function createPuzzle(){
  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";

  let shuffled = shuffle([...images]);

  shuffled.forEach((img, index)=>{

    const tile = document.createElement("img");
    tile.src = img;
    tile.classList.add("tile");

    tile.dataset.correct = img;
    tile.dataset.current = index;

    tile.draggable = true;

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

function swapTiles(a,b){
  let temp = a.src;
  a.src = b.src;
  b.src = temp;

  let tempData = a.dataset.correct;
  a.dataset.correct = b.dataset.correct;
  b.dataset.correct = tempData;
}

function checkWin(){
  const tiles = document.querySelectorAll(".tile");

  let win = true;

  tiles.forEach(tile=>{
    if(tile.src.includes(tile.dataset.correct) === false){
      win = false;
    }
  });

  if(win){
    document.getElementById("game").classList.add("hidden");
    document.getElementById("win").classList.remove("hidden");
  }
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    let j = Math.floor(Math.random()*i);
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}
