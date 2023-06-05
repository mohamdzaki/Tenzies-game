import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Dice from "./components/Dice/Dice";
import Confetti from "react-confetti";

function App() {
  const [dice, setNewDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setNewDice((prevState) =>
        prevState.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setNewDice(allNewDice());
    }
  }
  function holdDice(id) {
    setNewDice((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main className="container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice--container">
          {dice.map((dice) => (
            <Dice
              holdDice={() => holdDice(dice.id)}
              key={dice.id}
              isHeld={dice.isHeld}
              value={dice.value}
            />
          ))}
        </div>
        <div>
          <button onClick={rollDice}>
            {tenzies ? "New Game" : "Roll Dice"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
