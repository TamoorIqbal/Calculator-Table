import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [btnValue, setBtnValue] = useState("");
  const [result, setResult] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [previousResult, setPreviousResult] = useState(0);

  const handleBtn = (e) => {
    if (e.target.value === "÷") {
      // Divide
      setBtnValue(btnValue + "/");
    } else if (e.target.value === "×") {
      // Multiply
      setBtnValue(btnValue + "*");
    } else {
      // Other operators
      setBtnValue(btnValue + e.target.value);
    }
  };

  const handleBtnAC = (e) => {
    setBtnValue("");
  };

  const handleBtnDel = (e) => {
    setBtnValue(btnValue.slice(0, -1));
  };

  const handleBtnEqual = (e) => {
    const [firstNum, operator, secondNum] = btnValue.split(/([-+*/%])/);
    if (history.length < 1) {
      const val = eval(btnValue);
      setBtnValue(val);

      // setResult(`${btnValue} = ${val}`);

      const currentResult = val;

      setPreviousResult(val);
      setHistory([
        ...history,
        { firstNum, operator, secondNum, result: currentResult },
      ]);
    } else {
      const val = eval(btnValue);
      const currentResult = previousResult + operator + val;
      const val2 = eval(currentResult);

      setPreviousResult(currentResult);
      setBtnValue(val2);
      setHistory([...history, { firstNum, operator, secondNum, result: val2 }]);
    }
  };

  const now = new Date();
  const hrs = now.getHours();
  const mins = now.getMinutes();
  const ampm = hrs >= 12 ? "PM" : "AM";

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <div className="box">
        <div className="container">
          <header>
            <nav>
              <div className="time">
                <h1>
                  <span id="hrs">{hrs % 12 || 12}</span>
                  <span>:</span>
                  <span id="mins">{mins < 10 ? "0" + mins : mins} </span>
                  <span id="ampm"> {ampm} </span>
                </h1>
              </div>
              <ul className="navMenu">
                <li className="item">
                  <span className="material-symbols-outlined">
                    signal_cellular_alt
                  </span>
                </li>
                <li className="item">
                  <span className="material-symbols-outlined">
                    network_wifi_2_bar
                  </span>
                </li>
                <li className="item">
                  <span className="material-symbols-outlined battery">
                    battery_5_bar
                  </span>
                </li>
              </ul>
            </nav>
          </header>

          {/* <section className="toggleBtn">
            <div className="modeBtn">
              <span
                className={`material-symbols-outlined modeIcon ${
                  isDarkMode ? "" : "active"
                }`}
                onClick={handleModeToggle}
              >
                light_mode
              </span>
              <span
                className={`material-symbols-outlined modeIcon ${
                  isDarkMode ? "active" : ""
                }`}
                onClick={handleModeToggle}
              >
                dark_mode
              </span>
            </div>
          </section> */}

          <form action="" className="form">
            <section className="display">
              <input type="text" readOnly name="display" value={btnValue} />
            </section>

            <section className="buttons" id="buttonsWrapper">
              <input
                type="button"
                onClick={handleBtnAC}
                value="AC"
                className="topBtns"
              />
              <input
                type="button"
                onClick={handleBtnDel}
                value="DEL"
                className="topBtns"
              />
              <input
                type="button"
                onClick={handleBtn}
                value="%"
                className="topBtns"
              />
              <input
                type="button"
                onClick={handleBtn}
                value="&divide;"
                className="operators"
              />

              <input type="button" onClick={handleBtn} value="7" />
              <input type="button" onClick={handleBtn} value="8" />
              <input type="button" onClick={handleBtn} value="9" />
              <input
                type="button"
                onClick={handleBtn}
                value="&times;"
                className="operators"
              />

              <input type="button" onClick={handleBtn} value="4" />
              <input type="button" onClick={handleBtn} value="5" />
              <input type="button" onClick={handleBtn} value="6" />
              <input
                type="button"
                onClick={handleBtn}
                value="-"
                className="operators"
              />
              <input type="button" onClick={handleBtn} value="3" />
              <input type="button" onClick={handleBtn} value="2" />
              <input type="button" onClick={handleBtn} value="1" />
              <input
                type="button"
                onClick={handleBtn}
                value="+"
                className="operators"
              />
              <input type="button" onClick={handleBtn} value="0" />
              <input type="button" onClick={handleBtn} value="00" />
              <input type="button" onClick={handleBtn} value="." />
              <input
                type="button"
                onClick={handleBtnEqual}
                value="="
                className="operators"
              />
            </section>
          </form>
        </div>
        <div className="box1">
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left">1st Num</th>
                <th className="text-left">Operator</th>
                <th className="text-left">2nd Num</th>
                <th className="text-left">Result</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              {history.map((calculation, index) => (
                <tr key={index}>
                  <td className="text-left">{calculation.firstNum}</td>
                  <td className="text-left">{calculation.operator}</td>
                  <td className="text-left">{calculation.secondNum}</td>
                  <td className="text-left">{calculation.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Calculator;
