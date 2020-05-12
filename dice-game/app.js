// Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлая
// Тоглоомын дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

var activePlayer, scores, roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

function initGame() {
  // Тоглоом эхэллээ гэдэг төлөвт оруулна
  isNewGame = true;

  // Тоглогчдын ээлжийг хадгалах хувьсагч, 1-ээр тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр өгнө
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  // document.querySelector("#score-0").textContent = 0;
  // document.querySelector("#score-1").textContent = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // document.querySelector("#current-0").textContent = 0;
  // document.querySelector("#current-1").textContent = 0;

  // Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шинээр эхлүүлэх
initGame();

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame == true) {
    // 1-6 хүртэлх санамсаргүй тоог гаргана
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    //   Шооны зургийг веб дээр гаргана
    diceDom.style.display = "block";

    //   Буусан санамсаргүй тоонд харгалзах шооны зургийг гаргана
    diceDom.src = "dice-" + diceNumber + ".png";

    //   Буусан тоон нь 1-ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      //   1-ээс ялгаатай тоон буулаа. Буусан тоог тоглогчид нэмж өгнө
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //   1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө

      switchToNextPlayer();
      /*if(activePlayer==0{
      activePlayer=1;
  })else{
      activePlayer=0;
  }*/
    }
  } else alert("Тоглоом дууссан байна!!!");
});

// Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нэмж өгнө
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Дэлгэц дээр оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг шалгах
    if (scores[activePlayer] >= 20) {
      // Тоглоом дууссан төлөвт оруулна
      isNewGame = false;

      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      switchToNextPlayer();
    }
  } else alert("Тоглоом дууссан байна!!!");
});

// Энэ функц нь тоглогчийн тоглох ээлжийг солино
function switchToNextPlayer() {
  // Тоглогчийн ээлжийг солино
  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно
  diceDom.style.display = "none";

  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоё
  document.getElementById("current-" + activePlayer).textContent = "0";

  // Тоглогчийн оноо 1 буусан тул цуглуулсан оноог 0 болгоно
  roundScore = 0;

  //   Хэрэв идэвхитэй тоглогчийн 0 байвал идэвхитэй тоглогчийг 1 болго
  //   Үгүй бол идэвхитэй тоглогчийг 0 болго
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

// Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
