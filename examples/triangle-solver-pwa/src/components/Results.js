import React from 'react'

const Results = ({triangle}) => {
  return (
    <div className="result-table">
      <h2>Results:</h2>
      <div className="table-column">
        <h3>Sides</h3>
        <div>a: {triangle.sides.a}</div>
        <div>b: {triangle.sides.b}</div>
        <div>c: {triangle.sides.c}</div>
      </div>

      <div className="table-column">
        <h3>Angles</h3>
        <div>A: {triangle.angles.A}</div>
        <div>B: {triangle.angles.B}</div>
        <div>C: {triangle.angles.C}</div>
      </div>     
    </div>
  )
}

export default Results