import React, { useState, useEffect } from "react";
//import "./RecordEntry.css";
import Firebase from "firebase/compat/app";
//import 'firebase/auth";
import "firebase/compat/firestore";

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
const Sprint10Yard = {
  id: "c-004",
  name: "10 Yard Sprint",
  unitType: "s",
};
const Sprint5105 = {
  id: "c-005",
  name: "5 10 5 Sprint",
  unitType: "s",
};

const exercises = [Sprint10Yard, Sprint5105, snatch, clean, jerk];
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
      <h1>Enter Record</h1>
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
        <h1>Records</h1>
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
              <li>
                {record.name}, {record.record}, {record.exercise}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordEntry;
