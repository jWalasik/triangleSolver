import Triangle from './index'
//triangle types
const acute = {a:3.255,b:3,c:2.654,A:70,B:50,C:60},
      equilateral = {a:3,b:3,c:3,A:60,B:60,C:60},
      right = {a:3,b:4,c:5,A:36.9,B:53.1,C:90},
      obtuse = {a:4.67,b:6,c:8.77,A:30,B:110,C:40},
      isoceles = {a:12.92,b:10.64,c:12.92,A:65.7,B:48.6,C:65.7},
      scalene = {a:3.66,b:5,c:4.48,A:45,B:60,C:75}

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
  it('whole object', ()=>{
    const triangle = new Triangle({a:6, b:6, c:6, A:60,B:60, C:60})

    triangle.update(right)
    expect(triangle.sides).toEqual(
      {a: right.a, b: right.b, c: right.c}
    )
    expect(triangle.angles).toEqual(
      {A: right.A, B: right.B, C: right.C}
    )
  })
  
  it('sides', ()=>{
    const triangle = new Triangle({a:6, b:6, c:6, A:60,B:60, C:60})

    triangle.update({a:right.a, b:right.b, c:right.c})
    expect(triangle.sides).toEqual(
      {a: right.a, b: right.b, c: right.c}
    )
    expect(triangle.angles).toEqual(
      {A: null, B: null, C: null}
    )
  })

  it('mixed values', ()=>{
    const triangle = new Triangle({a:6, b:6, c:6, A:60,B:60, C:60})
    triangle.update({a:right.a, b:right.b, C:right.C})
    expect(triangle.sides).toEqual(
      {a: right.a, b: right.b, c: null}
    )
    expect(triangle.angles).toEqual(
      {A: null, B: null, C: right.C}
    )
  })  
})

describe('Should solve triangles properly', ()=>{
  describe('Equilateral triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a: equilateral.a, b:equilateral.b, c:equilateral.c})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:equilateral.A,b:equilateral.b,c:equilateral.c})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:equilateral.A, b:equilateral.b, B:equilateral.B})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:equilateral.b, c:equilateral.c, C:equilateral.C})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:equilateral.b, c:equilateral.c, B:equilateral.B})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:equilateral.A, b:equilateral.b, C:equilateral.C})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(equilateral.a)
      expect(triangle.sides.b).toBeCloseTo(equilateral.b)
      expect(triangle.sides.c).toBeCloseTo(equilateral.c)
      expect(triangle.sides.A).toBeCloseTo(equilateral.A)
      expect(triangle.sides.B).toBeCloseTo(equilateral.B)
      expect(triangle.sides.C).toBeCloseTo(equilateral.C)
    })
  })

  describe('Obtuse triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:obtuse.a, b:obtuse.b, c:obtuse.c})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(obtuse.a)
      expect(triangle.sides.b).toBeCloseTo(obtuse.b)
      expect(triangle.sides.c).toBeCloseTo(obtuse.c)
      expect(triangle.sides.A).toBeCloseTo(obtuse.A)
      expect(triangle.sides.B).toBeCloseTo(obtuse.B)
      expect(triangle.sides.C).toBeCloseTo(obtuse.C)
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, c:obtuse.c})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(obtuse.a)
      expect(triangle.sides.b).toBeCloseTo(obtuse.b)
      expect(triangle.sides.c).toBeCloseTo(obtuse.c)
      expect(triangle.sides.A).toBeCloseTo(obtuse.A)
      expect(triangle.sides.B).toBeCloseTo(obtuse.B)
      expect(triangle.sides.C).toBeCloseTo(obtuse.C)
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, B:obtuse.B})
      triangle.solve()
      expect(triangle.sides.a).toBeCloseTo(obtuse.a)
      expect(triangle.sides.b).toBeCloseTo(obtuse.b)
      expect(triangle.sides.c).toBeCloseTo(obtuse.c)
      expect(triangle.sides.A).toBeCloseTo(obtuse.A)
      expect(triangle.sides.B).toBeCloseTo(obtuse.B)
      expect(triangle.sides.C).toBeCloseTo(obtuse.C)
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:obtuse.b, c:obtuse.c, C:obtuse.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:obtuse.a, b:obtuse.b, c:obtuse.c})
      expect(triangle.angles).toEqual({A:obtuse.A, B:obtuse.B, C:obtuse.C})
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:obtuse.b, c:obtuse.c, B:obtuse.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:obtuse.a, b:obtuse.b, c:obtuse.c})
      expect(triangle.angles).toEqual({A:obtuse.A, B:obtuse.B, C:obtuse.C})
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:obtuse.A, b:obtuse.b, C:obtuse.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:obtuse.a, b:obtuse.b, c:obtuse.c})
      expect(triangle.angles).toEqual({A:obtuse.A, B:obtuse.B, C:obtuse.C})
    })
  })

  describe('Acute triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:acute.a, b:acute.b, c:acute.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, c:acute.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, B:acute.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:acute.b, c:acute.c, C:acute.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:acute.b, c:acute.c, B:acute.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:acute.A, b:acute.b, C:acute.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:acute.a, b:acute.b, c:acute.c})
      expect(triangle.angles).toEqual({A:acute.A, B:acute.B, C:acute.C})
    })
  })

  describe('Isoceles triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, c:isoceles.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, B:isoceles.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:isoceles.b, c:isoceles.c, C:isoceles.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:isoceles.b, c:isoceles.c, B:isoceles.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:isoceles.A, b:isoceles.b, C:isoceles.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:isoceles.a, b:isoceles.b, c:isoceles.c})
      expect(triangle.angles).toEqual({A:isoceles.A, B:isoceles.B, C:isoceles.C})
    })
  })

  describe('Right triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:right.a, b:right.b, c:right.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, c:right.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, B:right.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:right.b, c:right.c, C:right.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:right.b, c:right.c, B:right.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:right.A, b:right.b, C:right.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:right.a, b:right.b, c:right.c})
      expect(triangle.angles).toEqual({A:right.A, B:right.B, C:right.C})
    })
  })

  describe('Scalene triangles:', ()=>{
    it('SSS case', ()=>{
      const triangle = new Triangle({a:scalene.a, b:scalene.b, c:scalene.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
    })
    it('SAS case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, c:scalene.c})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
    })
    it('AAS case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, B:scalene.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
    })
    it('sSA case', ()=>{
      const triangle = new Triangle({b:scalene.b, c:scalene.c, C:scalene.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
    })
    it('SsA case', ()=>{
      const triangle = new Triangle({b:scalene.b, c:scalene.c, B:scalene.B})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
    })
    it('ASA case', ()=>{
      const triangle = new Triangle({A:scalene.A, b:scalene.b, C:scalene.C})
      triangle.solve()
      expect(triangle.sides).toEqual({a:scalene.a, b:scalene.b, c:scalene.c})
      expect(triangle.angles).toEqual({A:scalene.A, B:scalene.B, C:scalene.C})
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