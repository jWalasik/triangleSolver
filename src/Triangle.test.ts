import Triangle from './index'

//jest.mock('./index')

//mocks
const acute = {a:3.255,b:3,c:2.654,A:70,B:50,C:60},
      obtuse = {a:3,b:3,c:3,A:60,B:60,C:60},
      right = {a:3,b:3,c:3,A:60,B:60,C:60},
      equilateral = {a:3,b:3,c:3,A:60,B:60,C:60},
      isoceles = {a:3,b:3,c:3,A:60,B:60,C:60},
      scalene = {a:3,b:3,c:3,A:60,B:60,C:60}

//snapshots

test('Should properly initialize triangle without values', ()=>{
  const triangleSolver = new Triangle({})
  console.log(triangleSolver)
  expect(triangleSolver.sides).toEqual({a:null, b:null, c:null})
  expect(triangleSolver.angles).toEqual({A:null, B:null, C:null})
})

test('Should properly initialize triangle with values', ()=>{
  const triangleSolver = new Triangle(isoceles)
  expect(triangleSolver.sides).toEqual({a:3, b:3, c:3})
  expect(triangleSolver.angles).toEqual({A:60, B:60, C:60})
})

describe('Should properly solve acute triangles', ()=>{
  test('Should properly solve SSS case', ()=>{
    const triangle = new Triangle({a:5,b:5, c:5})
    triangle.solve()
    expect(triangle.angles).toEqual({A:60, B:60, C:60})
  })
})

test('Should properly solve obtuse triangles', ()=>{
  const triangleSolver = new Triangle(obtuse)
})

test('Should properly solve right triangles', ()=>{
  const triangleSolver = new Triangle(right)
})

test('Should properly solve equilateral triangles', ()=>{
  const triangleSolver = new Triangle(equilateral)
})

test('Should properly solve isosceles triangles', ()=>{
  const triangleSolver = new Triangle(isoceles)
})

test('Should properly solve scalene triangles', ()=>{
  const triangleSolver = new Triangle(scalene)
})