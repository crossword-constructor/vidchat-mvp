import React from 'react';
import logo from './logo.svg';
import './App.css';
// https://www.pubnub.com/blog/webrtc-video-chat-app-in-20-lines-of-javascript/
function login(form) {
  const phone = window.phone = PHONE({
    number: form.username.value || "Anonymous", // listen on username line else Anonymous
    publish_key: 'your_pub_key',
    subscribe_key: 'your_sub_key',
  });
  phone.ready(function () { form.username.style.background = "#55ff5b"; });
  phone.receive(function (session) {
    session.connected(function (session) { video_out.appendChild(session.video); });
    session.ended(function (session) { video_out.innerHTML = ''; });
  });
  return false; 	// So the form does not submit.
}

function App() {
  return (
    <div className="App">
      <div id="vid-box"></div>

      <form name="loginForm" id="login" action="#" onSubmit={login}>
        <input type="text" name="username" id="username" placeholder="Pick a username!" />
        <input type="submit" name="login_submit" value="Log In" />
      </form>

      <form name="callForm" id="call" action="#" onsubmit="return makeCall(this);">
        <input type="text" name="number" placeholder="Enter user to dial!" />
        <input type="submit" value="Call" />
      </form>
    </div>
  );
}

export default App;
