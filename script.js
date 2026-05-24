let first = null;

function startGame(){
  document.getElementById("start").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  createPuzzle();
}

function createPuzzle(){
  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";

  let positions = [];

  for(let i=0;i<16;i++){
    positions.push(i);
  }

  positions = shuffle(positions);

  positions.forEach(pos=>{
    const div = document.createElement("div");
    div.classList.add("tile");

    let x = (pos % 4) * 80;
    let y = Math.floor(pos / 4) * 80;

    div.style.backgroundPosition = `-${x}px -${y}px`;

    div.dataset.correct = pos;

    div.onclick = function(){
      handleSwap(div);
    };

    puzzle.appendChild(div);
  });
}

function handleSwap(tile){
  if(!first){
    first = tile;
    tile.style.border = "2px solid red";
  } else {
    let temp = first.style.backgroundPosition;
    first.style.backgroundPosition = tile.style.backgroundPosition;
    tile.style.backgroundPosition = temp;

    first.style.border = "1px solid white";
    first = null;

    checkWin();
  }
}

function checkWin(){
  const tiles = document.querySelectorAll(".tile");

  let correct = true;

  tiles.forEach((t,i)=>{
    let x = (i % 4) * 80;
    let y = Math.floor(i / 4) * 80;

    if(t.style.backgroundPosition !== `-${x}px -${y}px`){
      correct = false;
    }
  });

  if(correct){
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
