import React, { useState, useEffect } from "react";
//import "./RecordEntry.css";
import Firebase from "firebase/compat/app";
//import 'firebase/auth";
import "firebase/compat/firestore";
import "./App.css";
// import Button from "@mui/material/Button";
// import Select from "@mui/material/Button";
// import TextField from "@mui/material/Button";

const firebaseConfig = {
  apiKey: "AIzaSyC1aYleud-AhwrY-_P-mUafEFDmCMmuD1s",
  authDomain: "adk-performance.firebaseapp.com",
  projectId: "adk-performance",
  storageBucket: "adk-performance.appspot.com",
  messagingSenderId: "956069877285",
  appId: "1:956069877285:web:1475dc822c5f69996d51cc",
  measurementId: "G-GC3982DMCZ",
};

const firebase = Firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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
const Fly10Yard = {
  id: "c-004",
  name: "10 Yard Fly",
  unitType: "s",
};
const Fly5Yard = {
  id: "c-006",
  name: "5 Yard Fly",
  unitType: "s",
};
const Sprint5105 = {
  id: "c-005",
  name: "5-10-5 Sprint",
  unitType: "s",
};
const Fly15Yard = {
  id: "c-007",
  name: "15 Yard Fly",
  unitType: "s",
};
const static10 = {
  id: "c-008",
  name: "Static 10 Yard Sprint",
  unitType: "s",
};
const static20 = {
  id: "c-009",
  name: "Static 20 Yard Sprint",
  unitType: "s",
};
const sprint5515 = {
  id: "c-010",
  name: "5-5-15 Sprint",
  unitType: "s",
};
const LDrill = {
  id: "c-011",
  name: "L-Drill",
  unitType: "s",
};
const vertical = {
  id: "c-012",
  name: "Vertical Jump",
  unitType: "in",
};
const LadderTest = {
  id: "c-013",
  name: "Ladder Test",
  unitType: "s",
};
const shuttle150 = {
  id: "c-014",
  name: "150yd Shuttle",
  unitType: "s",
};

const exercises = [
  Fly5Yard,
  Fly10Yard,
  Fly15Yard,
  static10,
  static20,
  Sprint5105,
  sprint5515,
  LDrill,
  vertical,
  LadderTest,
  shuttle150,
  snatch,
  clean,
  jerk,
];
const ref = firebase.firestore().collection("records");

const RecordEntry = () => {
  const [menuState, setMenuState] = React.useState(exercises[0].name);
  const [menu2State, setMenu2State] = React.useState(exercises[0].name);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const unSubscribe = ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        items.push(doc.data());
      });
      setRecords(items);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const saveRecord = (event) => {
    event.preventDefault();
    const elementsArray = [...event.target.elements];
    console.log(elementsArray);
    const formData = elementsArray.reduce((accumulator, currentValue) => {
      if (currentValue.id) {
        accumulator[currentValue.id] = currentValue.value;
      }
      return accumulator;
    }, {});

    db.collection("records").add(formData);
    console.log({ formData });
  };

  return (
    <div className="container">
      <h1 className="enterRecord">Enter Record</h1>
      <form onSubmit={saveRecord}>
        <select
          id="exercise"
          value={menuState}
          placeholder="Select Exercise"
          required
          onChange={function (event) {
            setMenuState(event.target.value);
          }}
        >
          {exercises.map((exercise) => (
            <option value={exercise.name}>{exercise.name}</option>
          ))}
        </select>
        <input
          required
          type="text"
          id="name"
          placeholder="Athlete Name"
        ></input>
        <input
          required
          type="number"
          id="record"
          placeholder="Record"
          step=".001"
        ></input>
        <button>Submit Record"</button>
      </form>
      <div>
        <h1 className="title">Records</h1>
        <select
          id="exerciseRecord"
          value={menu2State}
          placeholder="Select Exercise"
          onChange={function (event) {
            setMenu2State(event.target.value);
          }}
        >
          {exercises.map((exercise) => (
            <option value={exercise.name}>{exercise.name}</option>
          ))}
        </select>

        <ul>
          {records
            .filter((record) => {
              return record.exercise === menu2State;
            })
            .map((record) => (
              <li className="recordList">
                {record.name}, {record.record}
              </li>
            ))}
        </ul>
      </div>
      <div className="pageBottom"></div>
    </div>
  );
};

export default RecordEntry;
