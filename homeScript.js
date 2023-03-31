let playbtn = document.getElementById("letPlay");
let wrap = document.getElementById("wrapper");
let overlay = document.getElementById("overlay");
let wlcPage = document.getElementById("welcomePage");
let logbtn = document.getElementById("logout");
let covers = document.querySelectorAll(".cover");
let gamesSelected = document.querySelectorAll(".gameSelect");

let count = 0;

//for welcome page
playbtn.addEventListener("click", function () {
  let Playername = document.getElementById("nameId").value;
  let Playerage = document.getElementById("ageId").value;
  let showName = document.getElementById("playerName");
  if (Playerage == "" || Playername == "") {
    alert("Enter Your Details");
  } else {
    wlcPage.style.display = "none";
    wrap.classList.remove("hidden");
    showName.innerText = "Player: " + Playername;
    localStorage.setItem("loginUser", Playername);
  }
});

if (localStorage["loginUser"]) {
  wlcPage.style.display = "none";
  overlay.classList.add("hidden");
  document.getElementById("arrowNext").style.display = "none";
  wrap.classList.remove("hidden");
  document.getElementById("playerName").innerText =
    "Player: " + localStorage.getItem("loginUser");
}
logbtn.addEventListener("click", function () {
  setTimeout(() => {
    localStorage.clear();
    location.reload();
  }, 1000);
});

// for console cover
covers.forEach((cover, index) => {
  cover.style.left = `${index * 100}%`;
});

// for selected game name
gamesSelected.forEach((gameSelect, index) => {
  gameSelect.style.top = `${index * 100}%`;
});

const next = () => {
  if (count < covers.length - 1) {
    count++;
  }
  slide();
  gameSlide();
};
const back = () => {
  if (count > 0) {
    count--;
  }
  slide();
  gameSlide();
};

const slide = () => {
  covers.forEach((cover) => {
    cover.style.transform = `translateX(-${count * 100}%)`;
  });
};

const gameSlide = () => {
  gamesSelected.forEach((gameSelect) => {
    gameSelect.style.transform = `translateY(-${count * 100}%)`;
  });
};

// for overlay

function forNext() {
  document.getElementById("arrowNext").style.display = "none";
  document.getElementById("arrowBack").style.display = "block";
}
function forBack() {
  document.getElementById("arrowBack").style.display = "none";
  document.getElementById("arrowStart").style.display = "block";
}
function forStart() {
  document.getElementById("arrowStart").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
