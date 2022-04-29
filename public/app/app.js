const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const myData = document.querySelector("#myData");

hamburger.addEventListener("click", mobileMenu);
navMenu.addEventListener("click", closeMobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
function closeMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
function myFunction() {
  // .classList is a DOM property that allows styling in CSS
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of the menu
window.onclick = function (e) {
  // We assume a negative condition (!) menu is not active
  // until the user clicks on a button
  if (!e.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

//GETTING PAGE
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    MODEL.getMyContent("home");
  } else {
    MODEL.getMyContent(pageID);
    // console.log(pageID);
    getData();
  }
}

const additembtn = document.getElementsByClassName("addtocart-btn");

const circle = document.querySelector(".circleCount");
//GETTING CART NUMBER
let cartNumbers = 0;
let loggedIn = false;
function addCart() {
  if (loggedIn == true) {
    alert("Item has been added to cart");
    cartNumbers = cartNumbers + 1;
    console.log(cartNumbers);
    circle.style.display = "flex";
    circle.innerHTML = cartNumbers;
  } else {
    alert("Need to be logged in");
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();
}

var fullName = "";
function initFirebase() {
  console.log("...........firebase thing");
  firebase.auth().onAuthStateChanged(function (user) {
    //if user is there
    if (user) {
      loggedIn = true;
      if (user.displayName == null) {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: fullName, //get full name and update site
          })
          .then(() => {});
      } else {
        fullName = user.displayName;
      }
      //replace login button with signout button
      $(".profile").css("display", "none");
      $(".signout").css("display", "flex");
    }

    //if user is not there do these display
    else {
      loggedIn = false;
      fullName = "";
      $(".profile").css("display", "flex");
      $(".signout").css("display", "none");
    }
  });
}

//this function create a new user
function createNewUser() {
  // console.log("signin was clicked");
  let password = $("#cpassword").val();
  let email = $("#cemail").val();
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  // console.log(password + " and " + email);
  // console.log(password);
  // console.log(email);
  // console.log(fName);
  // console.log(lName);
  fullName = fName + " " + lName;
  // console.log(fullName);S
  alert("you have created an account");
  $(".profile").css("display", "none");
  $(".signout").css("display", "flex");
  loggedIn = true;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("error");
    });
}

//this function happens when login button is clicked
function login() {
  //gets users password and email input
  let password = $("#password").val();
  let email = $("#email").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log("signed in");
      alert("you have logged in");
      $(".profile").css("display", "none");
      $(".signout").css("display", "flex");
      if (cartNumbers == 0) {
        circle.style.display = "none";
      } else {
        circle.style.display = "flex";
      }

      loggedIn = true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}

//this function happens when the logout button is clicked
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("you are signed out");
      $(".profile").css("display", "flex");
      $(".signout").css("display", "none");
      circle.style.display = "none";

      loggedIn = false;
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

let games = [
  {
    id: 0,
    gameName: "Mario Odyssey",
    gameDescription:
      "Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds, known as 'Kingdoms' within the game, on the hat-shaped ship Odyssey, to rescue Princess Peach from Bowser, who plans to forcibly marry her.",
    gamePrice: "$29.99",
    gameImageName: "mario-1.avif",
    gameImageName2: "mario-2.jpeg",
    gameImageName3: "mario-3.webp",
    gameImageName4: "mario-4.webp",
    gameImageName5: "mario-5.jpg",
    gameImageName6: "mario-6.webp",
  },
  {
    id: 1,
    gameName: "Mario Kart 8",
    gameDescription:
      "Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses. Play locally in up to 4-player multiplayer in 1080p while playing in TV Mode. Every track from the Wii U version, including DLC, makes a glorious return. Plus, the Inklings appear as all-new guest characters, along with returning favorites, such as King Boo, Dry Bones, and Bowser Jr.!",
    gamePrice: "$29.99",
    gameImageName: "mk8-1.avif",
    gameImageName2: "mk8-2.jpeg",
    gameImageName3: "mk8-3.jpeg",
    gameImageName4: "mk8-4.jpeg",
    gameImageName5: "mk8-5.jpeg",
    gameImageName6: "mk8-6.jpeg",
  },
  {
    id: 2,
    gameName: "Animal Crossing: NH",
    gameDescription:
      "Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round",
    gamePrice: "$59.99",
    gameImageName: "acnh-1.avif",
    gameImageName2: "acnh-2.webp",
    gameImageName3: "acnh-3.webp",
    gameImageName4: "acnh-4.webp",
    gameImageName5: "acnh-5.webp",
    gameImageName6: "acnh-6.jpeg",
  },
  {
    id: 3,
    gameName: "Monster Hunter Rise",
    gameDescription:
      "Set in the ninja-inspired land of Kamura Village, explore lush ecosystems and battle fearsome monsters to become the ultimate hunter. It's been half a century since the last calamity struck, but a terrifying new monster has reared its head and threatens to plunge the land into chaos once again",
    gamePrice: "$29.99",
    gameImageName: "mhr-1.avif",
    gameImageName2: "mhr-2.jpeg",
    gameImageName3: "mhr-3.jpg",
    gameImageName4: "mhr-4.jpeg",
    gameImageName5: "mhr-5.jpeg",
    gameImageName6: "mhr-6.jpeg",
  },
  {
    id: 4,
    gameName: "Halo Infinite",
    gameDescription:
      "When all hope is lost and humanity's fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he's ever faced. Step inside the armor of humanity's greatest hero to experience an epic adventure and explore the massive scale of the Halo ring",
    gamePrice: "$59.99",
    gameImageName: "halo-1.jpeg",
    gameImageName2: "halo-2.jpeg",
    gameImageName3: "halo-3.jpeg",
    gameImageName4: "halo-4.jpeg",
    gameImageName5: "halo-5.webp",
    gameImageName6: "halo-6.jpeg",
  },
  {
    id: 5,
    gameName: "Forza Horizon 5",
    gameDescription:
      "Forza Horizon 5 is a racing video game set in an open world environment based in a fictional representation of Mexico. The game has the largest map in the entire Forza Horizon series, being 50% larger than its predecessor",
    gamePrice: "$59.99",
    gameImageName: "fh5-1.jpeg",
    gameImageName2: "fh5-2.webp",
    gameImageName3: "fh5-3.jpg",
    gameImageName4: "fh5-4.jpeg",
    gameImageName5: "fh5-5.jpeg",
    gameImageName6: "fh5-6.webp",
  },
  {
    id: 6,
    gameName: "Gears of War",
    gameDescription:
      "With all-out war descending, Kait Diaz breaks away to uncover her connection to the enemy and discovers the true danger to Sera - herself. Starting November 10, take your character and weapon skins into new playthroughs and enjoy bonus difficulties and modifiers",
    gamePrice: "$59.99",
    gameImageName: "gears-1.jpeg",
    gameImageName2: "gears-2.jpeg",
    gameImageName3: "gears-3.jpeg",
    gameImageName4: "gears-4.jpeg",
    gameImageName5: "gears-5.jpg",
    gameImageName6: "gears-6.jpeg",
  },
  {
    id: 7,
    gameName: "Grounded",
    gameDescription:
      "The world is a vast, beautiful and dangerous place - especially when you have been shrunk to the size of an ant. Can you thrive alongside the hordes of giant insects, fighting to survive the perils of the backyard?",
    gamePrice: "$29.99",
    gameImageName: "grounded-4.jpeg",
    gameImageName2: "grounded-2.jpeg",
    gameImageName3: "grounded-3.jpg",
    gameImageName4: "grounded-1.jpg",
    gameImageName5: "grounded-5.jpeg",
    gameImageName6: "grounded-6.webp",
  },
  {
    id: 8,
    gameName: "God of War",
    gameDescription:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
    gamePrice: "$59.99",
    gameImageName: "gow-2.webp",
    gameImageName2: "gow-1.jpeg",
    gameImageName3: "gow-3.jpeg",
    gameImageName4: "gow-4.webp",
    gameImageName5: "gow-5.webp",
    gameImageName6: "gow-6.jpeg",
  },
  {
    id: 9,
    gameName: "Spiderman",
    gameDescription:
      "Marvel's Spider-Man is an open-world third-person action-adventure game, in which the player controls Peter Parker, under his superhero identity Spider-Man, through Manhattan, New York City to fight crime.",
    gamePrice: "$59.99",
    gameImageName: "spiderman-1.webp",
    gameImageName2: "spiderman-2.png",
    gameImageName3: "spiderman-3.jpeg",
    gameImageName4: "spiderman-1.webp",
    gameImageName5: "spiderman-6.webp",
    gameImageName6: "spiderman-7.jpeg",
  },
  {
    id: 10,
    gameName: "Horizon Zero Dawn",
    gameDescription:
      "In an era where Machines roam the land and mankind is no longer the dominant species, a young hunter named Aloy embarks on a journey to discover her destiny. In a lush, post-apocalyptic world where nature has reclaimed the ruins of a forgotten civilization, pockets of humanity live on in primitive hunter-gatherer tribes. Their dominion over the new wilderness has been usurped by the Machines fearsome mechanical creatures of unknown origin.",
    gamePrice: "$29.99",
    gameImageName: "hzd-1.jpg",
    gameImageName2: "hzd-2.jpeg",
    gameImageName3: "hzd-3.jpeg",
    gameImageName4: "hzd-4.jpeg",
    gameImageName5: "hzd-5.webp",
    gameImageName6: "hzd-6.webp",
  },
  {
    id: 11,
    gameName: "Uncharted 4",
    gameDescription:
      "On the hunt for Captain Henry Avery's long-lost treasure, Sam and Drake set off to find Libertalia, the pirate utopia deep in the forests of Madagascar. A Thief's End takes players on a journey around the globe, through jungle isles, far-flung cities and snow-capped peaks on the search for Avery's fortune.",
    gamePrice: "$29.99",
    gameImageName: "uncharted-1.jpeg",
    gameImageName2: "uncharted-2.jpeg",
    gameImageName3: "uncharted-3.jpeg",
    gameImageName4: "uncharted-4.jpeg",
    gameImageName5: "uncharted-5.jpeg",
    gameImageName6: "uncharted-6.jpeg",
  },
];
//when square is clicked

function getNumber(event) {
  console.log("getting number... " + event);
  console.log(games[event]);
  $(".content").html(``);
  $(".content2").html(``);
  $(".content3").html(``);
  let dDiv = `
  <div class="game-holder">
  
      <img src="../../images/${games[event].gameImageName}" alt="">
      <div class="game-info">
          <h2>${games[event].gameName}</h2>
          <p>${games[event].gameDescription}</p>
          <h3>${games[event].gamePrice}</h3>
          <div onclick="addCart()" class="addtocart-btn">
              <p>add to cart</p>
          </div>
          <div onclick = "getData()" class="back-btn"> <p>Continue Browsing</p></div>
      </div>
  </div>
  <div class="game-pictures">
      <img src="../../images/${games[event].gameImageName2}" alt="">
      <img src="../../images/${games[event].gameImageName3}" alt="">
      <img src="../../images/${games[event].gameImageName4}" alt="">
      <img src="../../images/${games[event].gameImageName5}" alt="">
      <img src="../../images/${games[event].gameImageName6}" alt="">

  </div>
</div>
  `;
  $(".content").append(dDiv);
  $(".content2").append(dDiv);
  $(".content3").append(dDiv);
}

function getData() {
  // =====DOG DATA==========
  $.getJSON("data/data.json", function (data) {
    // This is called when the file is loaded
    // console.log(data.Dogs);
  })
    .done(function (doneData) {
      $(".content").html(``);
      //  This is an example of jQuery's each statement
      $.each(doneData.NintendoGames, function (index, nintendo) {
        let nDiv = `<div class="nintendoholder">
        <img src="images/${nintendo.gameImageName}" alt="">
        <h1>${nintendo.gameName}</h1>
        <a ><div class="btn" onClick="getNumber(${nintendo.id})" > view details </div></a>
    </div>`;
        $(".content").append(nDiv);
      });
    })
    .fail(function (error) {
      //This is called when there is an error loading the file
      console.log("File", error.statusText);
    });
  // =====CAT DATA===========
  $.getJSON("data/data2.json", function (data) {
    // This is called when the file is loaded
    // console.log(data.Cats);
  })
    .done(function (doneData) {
      $(".content2").html(``);
      //  This is an example of jQuery's each statement
      $.each(doneData.XboxGames, function (index, xbox) {
        let xDiv = `<div class="xboxholder">
        <img src="images/${xbox.gameImageName}" alt="">
        <h1>${xbox.gameName}</h1>
        <a ><div class="btn" onClick="getNumber(${xbox.id})" > view details </div></a>
    </div>`;
        $(".content2").append(xDiv);
      });
    })
    .fail(function (error) {
      //This is called when there is an error loading the file
      console.log("File", error.statusText);
    });

  // =========BIRD DATA=========
  $.getJSON("data/data3.json", function (data) {
    // This is called when the file is loaded
    // console.log(data.Birds);
  })
    .done(function (doneData) {
      $(".content3").html(``);
      //  This is an example of jQuery's each statement
      $.each(doneData.SonyGames, function (index, sony) {
        let sDiv = `<div class="sonyholder">
        <img src="images/${sony.gameImageName}" alt="">
        <h1>${sony.gameName}</h1>
        <a ><div class="btn" onClick="getNumber(${sony.id})" > view details </div></a>
    </div>`;
        $(".content3").append(sDiv);
      });
    })
    .fail(function (error) {
      //This is called when there is an error loading the file
      console.log("File", error.statusText);
    });
}
function loadGamePage() {}

$(document).ready(function () {
  initListeners();
});
