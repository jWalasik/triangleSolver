import React from 'react';
import logo from './logo.svg';
import './App.css';
import triangleSolver from 'triangle-solver'

import Canvas from './components/Canvas'
import Results from './components/Results'

const defaults = {
  a:5, b:5, c:5,
  A:60, B:60, C:60
}
const triangle = new triangleSolver(defaults)

const App = () => {
  const [values, setValues] = React.useState({
    a: null,
    b: null,
    c: null,
    A: null,
    B: null,
    C: null
  })
  console.log(triangle)
  const handleValueChange = (e) => {
    setValues({
      ...values, 
      [e.target.id]: e.target.value === '' ? null : e.target.value //prevent empty string from being passed
    })
  }

  const solveTriangle = () => {
    triangle.update(values)
    triangle.solve()
    setValues({values}) //triggers rerender, bad hack, dont do this
  }

  return (
    <div className="App">
      <h1>triangleSolver</h1>

      <div className="display">
        <h2>{triangle.status}</h2>
        <div className="input-field side-a">
          <label>a</label>
          <input 
            id='a'
            onChange={handleValueChange}
            value={values.a}
            type="number"
            placeholder="length"
          />
        </div>

        <div className="input-field side-b">
          <label>b</label>
          <input 
            id='b'
            onChange={handleValueChange}
            value={values.b}
            type="number"
            placeholder="length"
          />
        </div>

        <div className="input-field side-c">
          <label>c</label>
          <input 
            id='c'
            onChange={handleValueChange}
            value={values.c}
            type="number"
            placeholder="length"
          />
        </div>

        <div className="input-field angle-A">
          <label>A</label>
          <input 
            id='A'
            onChange={handleValueChange}
            value={values.A}
            type="number"
            placeholder="angles in degree"
          />
        </div>

        <div className="input-field angle-B">
          <label>B</label>
          <input
            id='B'
            onChange={handleValueChange}
            value={values.B}
            type="number"
            placeholder="angle in degrees"
          />
        </div>

        <div className="input-field angle-C">
          <label>C</label>
          <input
            id='C'
            onChange={handleValueChange}
            value={values.C}
            type="number"
            placeholder="angle in degrees"
          />
        </div>

        <Canvas triangle={triangle} />
      </div>

      <Results triangle={triangle} />

      <button onClick={solveTriangle}>SOLVE</button>
    </div>
  );
}

export default App;
