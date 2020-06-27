import Triangle from './index'
//triangle types
const acute = {a:3.255,b:3,c:2.654,A:70,B:50,C:60},
      obtuse = {a:3,b:3,c:3,A:60,B:60,C:60},
      right = {a:3,b:3,c:3,A:60,B:60,C:60},
      equilateral = {a:3,b:3,c:3,A:60,B:60,C:60},
      isoceles = {a:3,b:3,c:3,A:60,B:60,C:60},
      scalene = {a:3,b:3,c:3,A:60,B:60,C:60}

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

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })

  describe('Obtuse triangles:', ()=>{
    it('SSS case', ()=>{

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })

  describe('Acute triangles:', ()=>{
    it('SSS case', ()=>{

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })

  describe('Isoceles triangles:', ()=>{
    it('SSS case', ()=>{

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })

  describe('Right triangles:', ()=>{
    it('SSS case', ()=>{

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })

  describe('Scalene triangles:', ()=>{
    it('SSS case', ()=>{

    })
    it('SAS case', ()=>{
      
    })
    it('AAS case', ()=>{
      
    })
    it('sSA case', ()=>{
      
    })
    it('SsA case', ()=>{
      
    })
    it('ASA case', ()=>{
      
    })
  })
})

describe('Should pick correct algorithm', ()=>{
  it('SSS case', ()=>{
    const triangle = new Triangle({a:3, b:3, c:3})
    expect(triangle.pickAlgorithm()).toEqual('SSS')
  })
  it('SAS case', ()=>{
    
  })
  it('AAS case', ()=>{
    
  })
  it('sSA case', ()=>{
    
  })
  it('SsA case', ()=>{
    
  })
  it('ASA case', ()=>{
    
  })
})

describe('Should draw triangles', ()=>{
  //no canvas support for now
})