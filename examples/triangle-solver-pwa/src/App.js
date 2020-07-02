import React from 'react';
import logo from './logo.svg';
import './App.css';
import TriangleSolver from 'triangle-solver'

import Canvas from './components/Canvas'
import Results from './components/Results'

const defaults = {
  a:5, b:5, c:5,
  A:60, B:60, C:60
}
const triangle = new TriangleSolver(defaults)

const App = () => {
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    setUpdate(false);
  }, [update]);

  const handleValueChange = e => {
    const { id, value } = e.target;
    triangle.update(id, value);
    triangle.validateInput();
    setUpdate(true);
  };

  const solveTriangle = () => {
    triangle.solve().then(res => {
      setUpdate(true);
    });
  };

  return (
    <div className="App">
      <h1>triangleSolver</h1>

      <div className="display">
        <h2>{triangle.status}</h2>

        <div className="inputs">
          <div className="inputs--sides">
            <div className="input-field side-a">
              <label>a</label>
              <input 
                id='a'
                onChange={handleValueChange}
                value={triangle.sides.a}
                type="number"
                placeholder="length"
              />
            </div>

            <div className="input-field side-b">
              <label>b</label>
              <input 
                id='b'
                onChange={handleValueChange}
                value={triangle.sides.b}
                type="number"
                placeholder="length"
              />
            </div>

            <div className="input-field side-c">
              <label>c</label>
              <input 
                id='c'
                onChange={handleValueChange}
                value={triangle.sides.c}
                type="number"
                placeholder="length"
              />
            </div>
          </div>

          <div className="inputs--angles">
            <div className="input-field angle-A">
              <label>A</label>
              <input 
                id='A'
                onChange={handleValueChange}
                value={triangle.angles.A}
                type="number"
                placeholder="angles in degree"
              />
            </div>

            <div className="input-field angle-B">
              <label>B</label>
              <input
                id='B'
                onChange={handleValueChange}
                value={triangle.angles.B}
                type="number"
                placeholder="angle in degrees"
              />
            </div>

            <div className="input-field angle-C">
              <label>C</label>
              <input
                id='C'
                onChange={handleValueChange}
                value={triangle.angles.C}
                type="number"
                placeholder="angle in degrees"
              />
            </div>
          </div>
        </div>
             

        <Canvas triangle={triangle} />
      </div>

      <Results triangle={triangle} />

      <button onClick={solveTriangle}>SOLVE</button>
    </div>
  );
}

export default App;
