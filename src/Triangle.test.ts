import Triangle from './index'
//triangle types
const acute = {a:3.26,b:2.65,c:3,A:70,B:50,C:60},
      equilateral = {a:3,b:3,c:3,A:60,B:60,C:60},
      right = {a:3,b:4,c:5,A:36.87,B:53.13,C:90},
      obtuse = {a:4.67,b:6,c:8.77,A:30,B:40,C:110},
      isoceles = {a:12.92,b:10.64,c:12.92,A:65.66,B:48.64,C:65.7},
      scalene = {a:3.66,b:5,c:4.48,A:45,B:75,C:60}

describe('Should initialize properly', ()=>{
  it('have methods', ()=>{
    const triangle = new Triangle({})
    expect(triangle).toEqual(
      expect.objectContaining({
        toRad: expect.any(Function),
        toDeg: expect.any(Function),
        validateInput: expect.any(Function),
        validateResults: expect.any(Function),
        roundResults: expect.any(Function),
        pickAlgorithm: expect.any(Function),
        update: expect.any(Function),
        draw: expect.any(Function),
        solve: expect.any(Function)
      })
    )
  })
})

describe('Should handle angular measurement conversions:', ()=>{
  it('degrees to radians', ()=>{  
    const triangle = new Triangle({})
    const expected = triangle.toRad(45)
    expect(expected).toBeCloseTo(0.785398)
  })

  it('radians to degrees', ()=>{
    const triangle = new Triangle({})  
    const expected = triangle.toDeg(0.785398)
    expect(expected).toBeCloseTo(45)
  })
})

describe('Should validate inputs: ', ()=> {
  it('none', ()=>{
    const triangle = new Triangle({})
    triangle.validateInput()
    expect(triangle.status).toEqual('You need to provide at least one side')
  })

  it('AAA case', ()=>{
    const triangle = new Triangle({A:60, B:60, C:60})
    triangle.validateInput()
    expect(triangle.status).toEqual('You need to provide at least one side')
  })

  it('too many parameters', ()=>{
    const triangle = new Triangle({a:1, b:1, c:1, A: 60})
    triangle.validateInput()
    expect(triangle.status).toEqual('You need to provide exactly three values')
  })

  it('too few parameters', ()=>{
    const triangle = new Triangle({a:1, b:1})
    triangle.validateInput()
    expect(triangle.status).toEqual('You need to provide exactly three values')
  })

  it('sss case', ()=>{
    const triangle = new Triangle({a:1, b:1, c:1})
    triangle.validateInput()
    expect(triangle.status).toEqual('Valid input')
  })

  it('ssA case', ()=>{
    const triangle = new Triangle({a:1, b:1, C:60})
    triangle.validateInput()
    expect(triangle.status).toEqual('Valid input')
  })

  it('sAA case', ()=>{
    const triangle = new Triangle({a:1, B:60, C:60})
    triangle.validateInput()
    expect(triangle.status).toEqual('Valid input')
  })
})

describe('Should properly update values', ()=>{
  it('change side value', ()=>{
    const triangle = new Triangle({a:6, b:6, c:6, A:60,B:60, C:60})
    const id = 'a',
          value = 5
    triangle.update(id, value)

    expect(triangle.sides).toEqual(
      {a: 5, b: right.b, c: right.c}
    )
  })
  it('change angle value', ()=>{
    const triangle = new Triangle({a:6, b:6, c:6, A:60,B:60, C:60})
    const id = 'C',
          value = 20
    triangle.update(id, value)

    expect(triangle.sides).toEqual(
      {a: 5, b: right.b, c: 20}
    )
  })
})

describe('Should solve triangles properly', ()=>{
  const compare = (triangle, type, alt) => {
    const expected = eval(type)
    const closeTo = (expected, precision = 2) => ({
      asymmetricMatch: (actual) => Math.abs(expected - actual) < Math.pow(10, -precision) / 2
    });
    
    expect(triangle.sides).toMatchObject({
      a: closeTo(expected.a,3),
      b: closeTo(expected.b,3),
      c: closeTo(expected.c,3)
    })
    expect(triangle.angles).toMatchObject({
      A: closeTo(expected.A,3),
      B: closeTo(expected.B,3),
      C: closeTo(expected.C,3)
    })
  }
  
  describe('Equilateral triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a: equilateral.a, b:equilateral.b, c:equilateral.c})
      triangle.solve()
      return compare(triangle, 'equilateral')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:equilateral.A,b:equilateral.b,c:equilateral.c})
      triangle.solve()
      return compare(triangle, 'equilateral')
      
      triangle.solve()
      return compare(triangle, 'equilateral')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:equilateral.A, b:equilateral.b, C:equilateral.C})
      triangle.solve()
      return compare(triangle, 'equilateral')
      
    })
  })

  describe('Obtuse triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:obtuse.a, b:obtuse.b, c:obtuse.c})
      triangle.solve()
      return compare(triangle, 'obtuse')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, c:obtuse.c})
      triangle.solve()
      return compare(triangle, 'obtuse')
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, B:obtuse.B})
      triangle.solve()
      return compare(triangle, 'obtuse')
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:obtuse.b, c:obtuse.c, C:obtuse.C})
      triangle.solve()
      return compare(triangle, 'obtuse')
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:obtuse.b, c:obtuse.c, B:obtuse.B})
      triangle.solve()
      if((triangle.validator.sides + triangle.validator.angles !== 6) && triangle.alt){
        return compare(triangle, 'obtuse', true)
      }
      console.log('sSA',triangle.validator,triangle.sides, triangle.angles, triangle.alt)
      return compare(triangle, 'obtuse')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, C:obtuse.C})
      triangle.solve()
      return compare(triangle, 'obtuse')
    })
  })

  describe('Acute triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:acute.a, b:acute.b, c:acute.c})
      triangle.solve()
      return compare(triangle, 'acute')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, c:acute.c})
      triangle.solve()
      return compare(triangle, 'acute')
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, B:acute.B})
      triangle.solve()
      return compare(triangle, 'acute')
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:acute.b, c:acute.c, C:acute.C})
      triangle.solve()
      if((triangle.validator.sides + triangle.validator.angles !== 6) && triangle.alt){
        return compare(triangle, 'acute', true)
      }
      return compare(triangle, 'acute')
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:acute.b, c:acute.c, B:acute.B})
      triangle.solve()
      return compare(triangle, 'acute')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, C:acute.C})
      triangle.solve()
      return compare(triangle, 'acute')
    })
  })

  describe('Isoceles triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      triangle.solve()
      return compare(triangle, 'isoceles')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, c:isoceles.c})
      triangle.solve()
      return compare(triangle, 'isoceles')
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, B:isoceles.B})
      triangle.solve()
      return compare(triangle, 'isoceles')
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:isoceles.b, c:isoceles.c, C:isoceles.C})
      triangle.solve()
      if((triangle.validator.sides + triangle.validator.angles !== 6) && triangle.alt){
        return compare(triangle, 'isoceles', true)
      }
      return compare(triangle, 'isoceles')
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:isoceles.b, c:isoceles.c, B:isoceles.B})
      triangle.solve()
      return compare(triangle, 'isoceles')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, C:isoceles.C})
      triangle.solve()
      return compare(triangle, 'isoceles')
    })
  })

  describe('Right triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:right.a, b:right.b, c:right.c})
      triangle.solve()
      return compare(triangle, 'right')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, c:right.c})
      triangle.solve()
      return compare(triangle, 'right')
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, B:right.B})
      triangle.solve()
      return compare(triangle, 'right')
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:right.b, c:right.c, C:right.C})
      triangle.solve()
      if((triangle.validator.sides + triangle.validator.angles !== 6) && triangle.alt){
        return compare(triangle, 'right', true)
      }
      return compare(triangle, 'right')
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:right.b, c:right.c, B:right.B})
      triangle.solve()
      return compare(triangle, 'right')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, C:right.C})
      triangle.solve()
      return compare(triangle, 'right')
    })
  })

  describe('Scalene triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:scalene.a, b:scalene.b, c:scalene.c})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, c:scalene.c})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, B:scalene.B})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:scalene.b, c:scalene.c, C:scalene.C})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:scalene.b, c:scalene.c, B:scalene.B})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, C:scalene.C})
      triangle.solve()
      return compare(triangle, 'scalene')
    })
  })
})

describe('Should pick correct algorithm', ()=>{
  it('SSS case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('SAS case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('AAS case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('sSA case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('SsA case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('ASA case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
})

describe('Should draw triangles', ()=>{
  //no canvas support for now
})
