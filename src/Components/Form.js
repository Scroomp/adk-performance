import React from "react";

function Form(props) {
  return (
    <form>
      <div>
        <label>Score</label>
        <input type="number" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
