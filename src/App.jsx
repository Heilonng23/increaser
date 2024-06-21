import "./App.css";
import React, { useState } from "react";

function App() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabit] = useState([]);
  const [habmins, setHabMins] = useState([]);
  const [habminsInput, setHabminsInput] = useState("");
  const [habPeriod, setHabPeriod] = useState([]);
  const [habPeriodInput, setHabPeriodInput] = useState("");
  const [isAdderVisible, setIsAdderVisible] = useState(false);
  const [taskDone, setTaskDone] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trim inputs
    const trimmedHabitInput = habitInput.trim();
    const trimmedHabminsInput = habminsInput.trim();
    const trimmedHabPeriodInput = habPeriodInput.trim();

    if (trimmedHabitInput !== "" && trimmedHabminsInput !== "") {
      // Add the habit and minutes
      setHabit([...habits, trimmedHabitInput]);
      setHabMins([...habmins, Number(trimmedHabminsInput)]);
      setHabPeriod([...habPeriod, Number(trimmedHabPeriodInput)]);

      // Clear inputs
      setHabitInput("");
      setHabminsInput("");
      setHabPeriodInput("");
    } else {
      // Optionally, you can show an alert or handle the case where inputs are missing
      alert("Please fill out both habit and minutes fields.");
    }
  };
  const toggleAdder = () => {
    setIsAdderVisible((prev) => !prev);
  };
  const handleTaskDone = (index) => {
    if (habmins[index] === 0 && habPeriod[index] === 0) {
      return;
    }
    const updatedHabmins = [...habmins];
    const updatedHabPeriod = [...habPeriod];

    if (updatedHabmins[index] > 0) {
      updatedHabmins[index] -= index;
    }
    if (updatedHabPeriod[index] > 0) {
      updatedHabPeriod[index] -= 1;
    }
    setHabMins(updatedHabmins);
    setHabPeriod(updatedHabPeriod);

    if (updatedHabPeriod[index] === 0 && updatedHabmins[index] === 0) {
      const updatedHabits = [...habits];
      updatedHabits.splice(index, 1);

      setHabit(updatedHabits);
      setHabMins(updatedHabits);
      setHabPeriod(updatedHabits);

      setTaskDone((prevTask) => prevTask + 1);
    }
  };

  return (
    <div className="everything">
      <p>Increaser</p>
      <div className="container">
        <div className="habit names">
          <p className="title">Habits</p>
          <form className="opener" onSubmit={handleSubmit}>
            <span>Add new habit</span>
            <button
              className="btn-23"
              onClick={toggleAdder}
              type="button" /* use type="button" to prevent form submission */
            >
              <span className="text">+</span>
              <span aria-hidden="" className="marquee">
                +
              </span>
            </button>
            <div className={`adder ${isAdderVisible ? "visible" : ""}`}>
              <span>Habit title</span>
              <input
                type="text"
                value={habitInput}
                onChange={(e) => setHabitInput(e.target.value)}
              />
            </div>
            <div className={`adder ${isAdderVisible ? "visible" : ""}`}>
              <span>Minutes a day</span>
              <input
                type="text"
                value={habminsInput}
                onChange={(e) => setHabminsInput(e.target.value)}
              />
            </div>
            <div className={`adder ${isAdderVisible ? "visible" : ""}`}>
              <span>Challenge period</span>
              <input
                type="text"
                value={habPeriodInput}
                onChange={(e) => setHabPeriodInput(e.target.value)}
              />
            </div>
            <button className="btn-23" type="submit">
              <span className="text">Add</span>
              <span aria-hidden="" className="marquee">
                Add
              </span>
            </button>
          </form>
        </div>
        <div className="habit tracker">
          <p className="title">Past</p>
          <div className="addedHab">
            <ul>
              {habits.map((habit, index) => (
                <React.Fragment key={index}>
                  <li>Habit: {habit}</li>
                  <li>Duration: {habmins[index]} mins</li>
                  <li>Period: {habPeriod[index]} days</li>
                  <button
                    className="btn-23"
                    type="button"
                    onClick={() => handleTaskDone(index)}
                    disabled={habmins[index] === 0 && habPeriod[index] === 0}
                  >
                    <span className="text new"> Done</span>
                    <span aria-hidden="" className="marquee">
                      Done
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </ul>
            <span className="completed">Completed tasks {taskDone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
