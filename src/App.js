import "./App.css";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC1aYleud-AhwrY-_P-mUafEFDmCMmuD1s",
//   authDomain: "adk-performance.firebaseapp.com",
//   projectId: "adk-performance",
//   storageBucket: "adk-performance.appspot.com",
//   messagingSenderId: "956069877285",
//   appId: "1:956069877285:web:1475dc822c5f69996d51cc",
//   measurementId: "G-GC3982DMCZ",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

/*
User
{
  role: 'coach' | 'athlete'
  id: string
  name: string
  createdOn: Date
}
Exercise
{
  id: string
  name: string
  unitType: 'kg' | 'seconds' | 'inches'
  createdOn: Date
} 
ExerciseRecord
{
  id: string
  input: number
  userId: string (foreign key)
  exerciseId: string (foreign key)
  createdOn: Date
}
*/
const user1 = {
  id: "u-001",
  role: "athlete",
  name: "big boi",
};
const clean = {
  id: "c-001",
  name: "clean",
  unitType: "kg",
};
const snatch = {
  id: "c-002",
  name: "snatch",
  unitType: "kg",
};
const jerk = {
  id: "c-003",
  name: "jerk",
  unitType: "kg",
};

const exercises = [snatch, clean, jerk];
// const cleanRecord = {
//   id: "cr-001",
//   userId: "u-001",
//   exercise: "c-001",
//   input: 100,
// };
const records = [];
// Athlete -> single data point entry
// Coach -> multiple data point entry
//       -> one user for multiple exercise types
//       -> multiple users for one exercise type

// -- Goals --
// - [x] Given a list of exercises, render those exercises
// - [ ] Clicking on an exercise, will open a form, the form will have a number input
//   - Add a onClick event handler to each button
//   - That handler will set state of the active exercise (useing React.useState(null) => React.useState("clean "))
//   - When we have some state, we show a <form>
//   - {activeExercise !== null ? <form>SOME STUFF</form> : null}
// - [ ] Submitting the form will update "records" (React state)
// - [ ] Display the list of records

function App() {
  const [numbher, setNumbher] = React.useState("");
  return (
    <>
      <Navbar>
        <NavItem icon="I" />
        <NavItem icon="I" />
        <NavItem icon="I" />
        <NavItem icon="O">
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <div>
        <p>Enter Your Record</p>
        <input
          onChange={function (event) {
            setNumbher(event.target.value);
          }}
        />
        {exercises.map((exercise) => (
          <button style={{ display: "block" }}>{exercise.name}</button>
        ))}
      </div>
    </>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="itcon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-button">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem rightIcon="O" goToMenu="Settings">
            records
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "Settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-seconary"
      >
        <div className="menu">
          <DropdownItem leftIcon="O" goToMenu="main" />
          <DropdownItem>poop</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

//NAVBAR AND DROPDOWN MENU STUFF

export default App;

// ## Notes
// - <div name="haha"/> => React.createElement("div", { name: "haha" })
// - `function () {}`, `() => {}`, `function haha() {}`
// - Escape to JS with `{}`
