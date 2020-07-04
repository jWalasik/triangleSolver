import React from 'react'

const Inputs = ({triangle, handleValueChange}) => {
  return (
    <div className="inputs">
      <div className="inputs--sides">
        <h3>Sides</h3>
        <div className="input-field side-a">
          <label className="input-field__label">a</label>
          <input 
            className="input-field__input"
            id='a'
            onChange={handleValueChange}
            value={triangle.sides.a}
            type="number"
            placeholder="length"
          />
        </div>

        <div className="input-field side-b">
          <label className="input-field__label">b</label>
          <input 
            className="input-field__input"
            id='b'
            onChange={handleValueChange}
            value={triangle.sides.b}
            type="number"
            placeholder="length"
          />
        </div>

        <div className="input-field side-c">
          <label className="input-field__label">c</label>
          <input 
            className="input-field__input"
            id='c'
            onChange={handleValueChange}
            value={triangle.sides.c}
            type="number"
            placeholder="length"
          />
        </div>
      </div>

      <div className="inputs--angles">
        <h3>Angles</h3>
        <div className="input-field angle-A">
          <label className="input-field__label">A</label>
          <input 
            className="input-field__input"
            id='A'
            onChange={handleValueChange}
            value={triangle.angles.A}
            type="number"
            placeholder="angles in degree"
          />
        </div>

        <div className="input-field angle-B">
          <label className="input-field__label">B</label>
          <input
            className="input-field__input"
            id='B'
            onChange={handleValueChange}
            value={triangle.angles.B}
            type="number"
            placeholder="angle in degrees"
          />
        </div>

        <div className="input-field angle-C">
          <label className="input-field__label">C</label>
          <input
            className="input-field__input"
            id='C'
            onChange={handleValueChange}
            value={triangle.angles.C}
            type="number"
            placeholder="angle in degrees"
          />
        </div>
      </div>
    </div>
  )
}

export default Inputs