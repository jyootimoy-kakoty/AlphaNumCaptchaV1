import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  useEffect(() => {
    //listener will be added on component mounted
    window.addEventListener('load', () => {generateCaptcha()});
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
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

      <div className="captcha" onLoad={() => generateCaptcha()}>
        <div className="wrapper"></div>
        <h2 id="status" style={{color: '#ee7e6a'}}></h2>
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
    </div>
  );
}

let captcha = '';
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
//console.log(alphabets.length);

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
  console.log(captcha);
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

export default App;
