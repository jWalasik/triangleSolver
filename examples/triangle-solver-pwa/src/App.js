import React from 'react';
import './App.css';
import TriangleSolver from 'triangle-solver'; //import from package

import Canvas from './components/Canvas';
import Inputs from './components/Inputs';

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
    triangle.solve()
      .then(()=>setUpdate(true))
      .catch(err=>alert(err))
  };

  return (
    <div className="App">
      <h1 className="title">triangleSolver</h1>

      <div className="display">
        <h2>{triangle.status}</h2>
        
        <Canvas triangle={triangle} />
        <Inputs triangle={triangle} handleValueChange={handleValueChange} />
      </div>

      <button className="button-solve" onClick={solveTriangle}>SOLVE</button>
    </div>
  );
}

export default App;
