let score = 0;

function startGame(){

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  createHeart();
}

function createHeart(){

  const heart = document.createElement("div");

  heart.innerHTML = "❤️";
  heart.classList.add("heart");

  heart.style.left = Math.random()*80 + "%";
  heart.style.top = Math.random()*80 + "%";

  heart.onclick = function(){

    score++;

    document.getElementById("score").innerText = score;

    heart.remove();

    if(score < 5){
      createHeart();
    }

    else{
      document.getElementById("game-screen").classList.add("hidden");

      document.getElementById("message-screen").classList.remove("hidden");
    }
  };

  document.getElementById("heart-area").appendChild(heart);
}

function showTreaty(){

  document.getElementById("message-screen").classList.add("hidden");

  document.getElementById("treaty-screen").classList.remove("hidden");
}

function forgive(){

  document.getElementById("final-text").innerText =
  "Forgiveness accepted successfully 🎉🤍";
}
