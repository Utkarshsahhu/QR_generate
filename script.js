const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");
let preValue;


const dbtn = document.querySelector('.dbtn');
const backH = document.querySelector('.backH');
backH.style.visibility = "hidden";

const fullPage = document.querySelector('.fullscreen');
fullPage.style.visibility = "hidden";


let demo = document.getElementById("demo");
demo.style.visibility = "hidden";
let demo1 = document.getElementById("demo1");
demo1.style.visibility = "hidden";
let demo2 = document.getElementById("demo2");
demo2.style.visibility = "hidden";


var input = document.getElementById("text1");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});


generateBtn.addEventListener("click", () => {

  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code.....";
  generateBtn.style.cursor = "no-drop";
  generateBtn.style.opacity = "0.7";

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "QR Code Generated";
    generateBtn.style.cursor = "no-drop ";
    generateBtn.style.opacity = "0.7";

    document.querySelector("#text1").addEventListener("input", test);
    document.getElementById("btn").style.visibility = "hidden";
    backH.style.visibility = "visible";

    generateBtn.onmouseover = function () {
      setTimeout(() => {
        demo1.style.visibility = 'visible';
      }, 150);
    }

    generateBtn.onmouseout = function () {
      setTimeout(() => {
        demo1.style.visibility = 'hidden';
      }, 150);
    }
  });
});


qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {

    sameprop();

  }
});


function inputtext() {
  var value1 = document.getElementById('text1').value;
  if (value1.length == 0) {
    demo.style.visibility = "visible";
    setTimeout(() => {
      demo.style.visibility = 'hidden';
    }, 1300);
  }
}




document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
}


document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});


function FullScreenImg() {
  fullPage.style.visibility = "visible";
  fullPage.style.backgroundImage = 'url(' + qrImg.src + ')';
}


function downloadIg(elmnt) {
  demo2.style.visibility = "visible";
  dbtn.style.cursor = "no-drop";
  dbtn.style.opacity = "0.7";

  const link = elmnt
  const url = qrImg.src
  const options = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  fetch(url, options)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "QR_Code.jpg";
        a.click();
        dbtn.style.cursor = "pointer";
        dbtn.style.opacity = "1";
        demo2.style.visibility = "hidden";
      });
    });
}
