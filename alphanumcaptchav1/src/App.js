import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import crypto from 'crypto-js';

function App() {
  useEffect(() => {
    //listener will be added on component mounted
    window.addEventListener('load', () => {generateCaptcha(); generateImgCaptcha(); generateCryptoCaptcha()});
  }, [])
  const [aesHashedText,setAesHashedText] = useState("");
  const [md5HashedText,setMd5HashedText] = useState("");
  const [sha512HashedText,setSha512HashedText] = useState("");
  const [sha256HashedText,setSha256HashedText] = useState("");
  const [sha3HashedText,setSha3HashedText] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{display: 'none'}}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{display: 'none'}}
          //The two new tags can be used either separately or jointly, or in combination with "nofollow", depending on your goals and security requirements, and your desired effect on SEO (Search engine optimization).
          //rel="noreferrer"
          //When a user moves from URL X to URL Y, the owner of URL Y receives information about their previous web location. It is easy to identify the sources of incoming traffic by viewing a special report in Google Analytics. 
          //But the webmaster of URL X may not want the webmaster of URL Y to know that visitors are coming from their platform. To conceal this information, they can embed the noreferrer clause in the link’s HTML.
          //rel="noopener"
          //Under standard conditions, the window.opener property in JavaStrict provides pages linked from your online platform and opened in a new tab with partial control over your pages. This makes your online platform vulnerable, exposing it to potential theft of user data, alterations to your content, or other types of phishing attacks. 
          //To ensure greater security, you can disable the JS window.opener property by converting all your external references to the following format: <a href=”https://websitey.com” rel=”noopener”>Website Y</a>. 
          //With rel="noreferrer", traffic data is hidden exclusively from the owner of the referred platform, while access to links is retained for search engines. 
          //rel="nofollow" works in the opposite way – it disables links for search engines but keeps Referral traffic data available to referred websites. 
        >
          Learn React
        </a>
      </header>   

      <div className="captcha">
        <div className="wrapper"></div>
        <h2 id="status" style={{color: '#ee7e6a'}}>Captcha Challenge</h2>
        <div>
            <input type="text" readOnly id="generatedCaptcha"/>
        </div>
        <div>
            <input type="text" id="enteredCaptcha" placeholder="Enter the captcha.."/>
        </div>
        <button type="button" onClick={() => check()}>
            Submit
        </button>
        <button type="button" onClick={() => generateCaptcha()} id="gen">
            Generate New
        </button>
      </div>

      <div className="imgCaptcha">
        <div className="wrapper"></div>
        <h2 id="statusImgCaptcha" style={{color: '#ee7e6a'}}>Captcha Challenge</h2>
        <div>
            <canvas type="text" readOnly id="generatedImgCaptcha" height="22px"  width="270px"/>
        </div>
        <div>
            <input type="text" id="enteredImgCaptcha" placeholder="Enter the captcha.."/>
        </div>
        <button type="button" onClick={() => checkImgCaptcha()}>
            Submit
        </button>
        <button type="button" onClick={() => generateImgCaptcha()} id="genImg">
            Generate New
        </button>
      </div>

      <div className="cryptoCaptcha">
        <div className="wrapper"></div>
        <h2 id="statusCryptoCaptcha" style={{color: '#ee7e6a'}}>Captcha Challenge</h2>
        <div>
            <canvas type="text" readOnly id="generatedCryptoCaptcha" height="22px"  width="270px"/>
        </div>
        <div>
            <input type="text" id="enteredCryptoCaptcha" placeholder="Enter the captcha.."/>
        </div>
        <button type="button" onClick={() => checkCryptoCaptcha()}>
            Submit
        </button>
        <button type="button" onClick={() => generateCryptoCaptcha()} id="genCrypto">
            Generate New
        </button>
      </div>
    </div>
  );
}

let captcha = '', imgCaptcha = [], imgCaptchaLength = 6, imgCaptchaa = '';
let cryptoCaptcha = [], cryptoCaptchaLength = 6, cryptoCaptchaa = '', plainText = '';
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let charsArray = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz@!#$%^&*";
//console.log(alphabets.length);

function setMd5HashedText(plainText) {return crypto.MD5(plainText).toString()};// md5
function setSha512HashedText(plainText) {return crypto.SHA512(plainText).toString()};// sha512
function setSha256HashedText(plainText) {return crypto.SHA256(plainText).toString()};// sha256
function setSha3HashedText(plainText) {return crypto.SHA3(plainText).toString()};//sha3

/*Simple Text Captcha*/
function generateCaptcha() {
  let status = document.getElementById('status');
  status.innerText = "Captcha Challenge";
  // console.log(status)
  let first = alphabets[Math.floor(Math.random() * alphabets.length)];
  let second = Math.floor(Math.random() * 10);
  let third = Math.floor(Math.random() * 10);
  let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let sixth = Math.floor(Math.random() * 10);
  captcha = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
  //console.log(captcha);
  document.getElementById("generatedCaptcha").value = captcha;
  document.getElementById("enteredCaptcha").value = '';
}

function check() {
  let status = document.getElementById('status');
  // console.log(status)
  let userValue = document.getElementById("enteredCaptcha").value;
  //console.log(captcha);
  //console.log(userValue);
  if (userValue === captcha) {
    status.innerText = "Correct!!"
  } else {
    status.innerText = "Try Again!!";
    document.getElementById("enteredCaptcha").value = '';
  }
}

/*Image Captcha*/
function generateImgCaptcha() {
  let statusImgCaptcha = document.getElementById('statusImgCaptcha');
  statusImgCaptcha.innerText = "Captcha Challenge";
  imgCaptcha = [];
  imgCaptchaa = '';
  // console.log(status)
  for (let i = 0; i < imgCaptchaLength; i++) {
    imgCaptcha.push(charsArray[Math.floor(Math.random() * charsArray.length)]);
    imgCaptchaa += imgCaptcha[i].toString();
  }
  let captchaCanvas = document.getElementById("generatedImgCaptcha");
  let context = captchaCanvas.getContext("2d");
  context.clearRect ( 0, 0, captchaCanvas.width, captchaCanvas.height);//Clears the canvas
  //console.log(context);
  context.font = "20px Georgia";
  context.textAlign = "center";
  context.fillStyle = "yellow";
  context.strokeText(imgCaptcha.join(""), 135, 17, 270);
  //console.log(imgCaptcha, imgCaptchaa);
  context.beginPath();
  context.moveTo(40,(Math.random()%10));
  context.lineTo(250,20-(Math.random()%20));
  context.moveTo(80,10-(Math.random()%10));
  context.lineTo(190-(Math.random()%20),2);
  /*context.moveTo(110+(Math.random()%20),(Math.random()%5));
  context.lineTo(150,20+(Math.random()%5));*/
  context.stroke();
  document.getElementById("enteredImgCaptcha").value = '';
}

function checkImgCaptcha() {
  let statusImgCaptcha = document.getElementById('statusImgCaptcha');
  // console.log(status)
  let userValueImgCaptcha = document.getElementById("enteredImgCaptcha").value;
  //console.log(imgCaptchaa);
  //console.log(userValueImgCaptcha);
  
  if (userValueImgCaptcha === imgCaptchaa) {
    statusImgCaptcha.innerText = "Correct!!"
  } else {
    statusImgCaptcha.innerText = "Try Again!!";
    document.getElementById("enteredImgCaptcha").value = '';
  }
}

/*Crypto Captcha*/
function generateCryptoCaptcha() {
  let statusCryptoCaptcha = document.getElementById('statusCryptoCaptcha');
  statusCryptoCaptcha.innerText = "Captcha Challenge";
  cryptoCaptcha = [];
  cryptoCaptchaa = '';
  // console.log(status)
  for (let i = 0; i < cryptoCaptchaLength; i++) {
    cryptoCaptcha.push(charsArray[Math.floor(Math.random() * charsArray.length)]);
    plainText += cryptoCaptcha[i].toString();
  }
  //console.log(setMd5HashedText(plainText));// md5
  //console.log(setSha512HashedText(plainText));// sha512
  //console.log(setSha256HashedText(plainText));// sha256
  //console.log(setSha3HashedText(plainText));//sha3
  
  let cryptoCaptchaCanvas = document.getElementById("generatedCryptoCaptcha");
  let context = cryptoCaptchaCanvas.getContext("2d");
  context.clearRect ( 0, 0, cryptoCaptchaCanvas.width, cryptoCaptchaCanvas.height);//Clears the canvas
  //console.log(context);
  context.font = "20px Georgia";
  context.textAlign = "center";
  context.fillStyle = "yellow";
  context.strokeText(cryptoCaptcha.join(""), 135, 17, 270);
  //console.log(cryptoCaptcha, cryptoCaptchaa);
  context.beginPath();
  context.moveTo(40,(Math.random()%10));
  context.lineTo(250,20-(Math.random()%20));
  context.moveTo(80,10-(Math.random()%10));
  context.lineTo(190-(Math.random()%20),2);
  /*context.moveTo(110+(Math.random()%20),(Math.random()%5));
  context.lineTo(150,20+(Math.random()%5));*/
  context.stroke();
  cryptoCaptchaa = setSha512HashedText(plainText);
  cryptoCaptcha = [];
  plainText ='';
  document.getElementById("enteredCryptoCaptcha").value = '';
}

function checkCryptoCaptcha() {
  let statusCryptoCaptcha = document.getElementById('statusCryptoCaptcha');
  // console.log(status)
  let userValueCryptoCaptcha = document.getElementById("enteredCryptoCaptcha").value;
  //console.log(cryptoCaptchaa);
  //console.log(userValueCryptoCaptcha);
  if (setSha512HashedText(userValueCryptoCaptcha) === cryptoCaptchaa) {
    statusCryptoCaptcha.innerText = "Correct!!"
  } else {
    statusCryptoCaptcha.innerText = "Try Again!!";
    document.getElementById("enteredCryptoCaptcha").value = '';
  }
}

export default App;
