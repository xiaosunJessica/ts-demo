import React, { useEffect, useState } from "react";
import "./index.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; lines[i] != null; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const NineGame = () => {
  const [history1, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    window.addEventListener("mousedown", function (e) {
      document.body.classList.add("mouse-navigation");
      document.body.classList.remove("kbd-navigation");
    });
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 9) {
        document.body.classList.add("kbd-navigation");
        document.body.classList.remove("mouse-navigation");
      }
    });
    window.addEventListener("click", function (e: any) {
      if (e.target.tagName === "A" && e.target.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
    window.onerror = function (message, source, line, col, error) {
      // var text = error
      //   ? error.stack || error
      //   : message + " (at " + source + ":" + line + ":" + col + ")";
      // errors.textContent += text + "\n";
      // errors.style.display = "";
    };
    console.error = (function (old) {
      return function error() {
        // errors.textContent +=
        //   Array.prototype.slice.call(arguments).join(" ") + "\n";
        // errors.style.display = "";
        old.apply(this, arguments);
      };
    })(console.error);
  }, []);

  const handleClick = (i) => {
    const history = history1.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    console.log(squares[i]);
    setHistory(
      history.concat([
        {
          squares: squares,
        },
      ])
    );

    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 ? false : true);
  };
  const history = history1;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Move #" + move : "Game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status = "";
  status = winner
    ? "Winner：" + winner
    : "Next Player：" + (xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default NineGame;
