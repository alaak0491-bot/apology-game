let dragged = null;

const images = [
  "img1.jpg","img2.jpg","img3.jpg","img4.jpg",
  "img5.jpg","img6.jpg","img7.jpg","img8.jpg",
  "img9.jpg","img10.jpg","img11.jpg","img12.jpg",
  "img13.jpg","img14.jpg","img15.jpg","img16.jpg"
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
