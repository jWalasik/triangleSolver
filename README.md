# triangleSolver
Simple script for solving and drawing triangles based on given side length and angles.

#Installation
npm install triangle-solver

#Usage
```javascript
let values = { //letter pairs i.e. a-A are opposite to each other as seen on picture above
  a:Int, //lowercase letters corresponds to sides length 
  b:Int, 
  c:Int, 
  A:Int, //uppercase letters corresponds to angle in degrees
  C:Int, 
  B:Int
}
let triangle = new Triangle(values)
```
Will return new instance of a triangle. 
Input requires precisely 3 values, including at least one side.

triangle.draw()
will return array of svg polygonal coordinates for solved triangle

#Contribution
Open an issue for any bugs or fork/pull
