import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './App.css';

function App() {
  const [inputState, setInputState] = useState(0)
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)
  const [currState, setCurrentState] = useState('')
  const [preset, setPreset] = useState("")

  const inputNum = (e) => {
    if (currState.includes(".") && e.target.innerText === ".") return
    if (total) {
      setPreset("")
    }
    currState ? setCurrentState((pre) => pre + e.target.innerText) : setCurrentState(e.target.innerText)
    setTotal(false)
  }
  useEffect(() => {
    setInputState(currState)
  }, [currState])

  useEffect(() => {
    setInputState('0')
  }, [])


  const operatorType = (e) => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (currState === "") return
    if (preset !== "") {
      equals()
    } else {
      setPreset(currState)
      setCurrentState('')
    }
  }

  const equals = (e) => {
    if (e.target.innerText === "=") {
      setTotal(true)
    }
    let calculation
    switch (operator) {
      case "/":
        calculation = String(parseFloat(preset) / parseFloat(currState))
        break;
      case "+":
        calculation = String(parseFloat(preset) + parseFloat(currState))
        break;
      case "-":
        calculation = String(parseFloat(preset) - parseFloat(currState))
        break;
      case "*":
        calculation = String(parseFloat(preset) * parseFloat(currState))
        break;
      default:
        return;
    }
    setInputState("")
    setPreset(calculation)
    setCurrentState("")

  }
  const presetBtn = () => {
    setInputState("0")
    setPreset("")
    setCurrentState("")
  }
  const minusPlus = () => {
    if (currState.charAt(0) === "-") {
      setCurrentState(currState.substring(1))
    } else {
      setCurrentState("-" + currState)
    }
  }
  const percentageBtn = () => {
    preset ? setCurrentState(String(parseFloat(currState / 100) * preset)) : setCurrentState(String(parseFloat(currState) / 100))
  }

  return (
    <div className="App">
      <div className="container">
        <p>{
          inputState !== "" || inputState === "0" ?
            <NumberFormat value={inputState} displayType={"text"} thousandSeparator={true} /> : <NumberFormat value={preset} displayType="text" thousandSeparator={true} />
        }</p>
        <div className="inner__cal__ui">
          <ul>
            <li onClick={presetBtn}>c</li>
            <li onClick={minusPlus}>+/-</li>
            <li onClick={percentageBtn}>%</li>
            <li onClick={operatorType}>/</li>
          </ul>
          <ul>
            <li onClick={inputNum}>7</li>
            <li onClick={inputNum}>8</li>
            <li onClick={inputNum}>9</li>
            <li onClick={operatorType}>*</li>
          </ul>
          <ul>
            <li onClick={inputNum}>4</li>
            <li onClick={inputNum}>5</li>
            <li onClick={inputNum}>6</li>
            <li onClick={operatorType}>-</li>
          </ul>
          <ul>
            <li onClick={inputNum}>1</li>
            <li onClick={inputNum}>2</li>
            <li onClick={inputNum}>3</li>
            <li onClick={operatorType}>+</li>
          </ul>
          <ul className='lastBtn'>
            <li onClick={inputNum}>0</li>
            <li onClick={inputNum}>.</li>
            <li onClick={equals}> = </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
