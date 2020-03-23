"use strict"

class Triangle {
  constructor({a=null,b=null,c=null,A=null,B=null,C=null}){
    this.sides = {
      a: a,
      b: b,
      c: c
    }
    this.angles = {
      A: A,
      B: B,
      C: C
    }
    this.area = null
    this.status = 'Three values need to be specified, including at least one side'
  }
  
  toRad(angle){
    return angle*(Math.PI/180)}
  toDeg(angle){
    return angle*(180/Math.PI)
  }
  
  algorithmMap = {
      SSS: ()=>{
        const computeAngle = (a,b,c) => {
          const result = Math.acos((a**2 + b**2 - c**2)/(2*a*b))
          return this.toDeg(result)
        }
        const a = this.sides.a,
              b = this.sides.b,
              c = this.sides.c
        const C = computeAngle(a,b,c),
              A = computeAngle(b,c,a),
              B = computeAngle(c,a,b);
        this.angles = {
          A: A,
          B: B,
          C: C
        }        
      },
      SAS: ()=>{
        //remove null values, store index
        const side = Object.values(this.sides).filter((x)=>!!x)        
        const angle = Object.entries(this.angles).filter(x=>!!x[1]).flat()
        
        //law of cosines to get missing side
        const missingSide = Math.sqrt(side[0]**2 + side[1]**2 - 2*side[0]*side[1]*Math.cos(this.toRad(angle[1])))
        this.sides[angle[0].toLowerCase()] = missingSide
        
        this.algorithmMap['SSS'](this.sides)
      },
      AAS: ()=>{
        //find missing angle
        const missingAngle = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
        const side = Object.entries(this.sides).filter((x)=>!!x[1]).flat()
        
        Object.entries(this.sides).forEach(entry=> {
          const key = entry[0].toUpperCase()
          if(!this.angles[key]) this.angles[key] = missingAngle
          if(!entry[1]){
            this.sides[entry[0]] = (Math.sin(this.toRad(this.angles[entry[0].toUpperCase()]))*side[1])/Math.sin(this.toRad(this.angles[side[0].toUpperCase()]))
          } 
        })
      },
      sSA: ()=>{
        //may produce two triangles
        const angle = Object.entries(this.angles).filter((x)=>!!x[1])
        //sort => long side, short side, unknown side
        const sides = Object.entries(this.sides).sort((a,b)=>b[1] - a[1])
        //long side / short side * angle adjacent to longer side
        const D = sides[0][1] / sides[1][1] * Math.sin(this.toRad(angle[0][1]))
        
        if(D>1){
          this.status = 'Invalid input, sides do not connect'
        }
        else if(D===1 || sides[0][1]===sides[1][1]){
          console.log('single solution')
          this.angles[sides[0][0].toUpperCase()] = this.toDeg(Math.asin(D)) //opposite to long side
          //find last angle
          this.angles[sides[2][0].toUpperCase()] = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
          
          //compute side using law of sines
          this.sides[sides[2][0]] = 
                this.sides[angle[0][0].toLowerCase()] 
                * 
                Math.sin(this.toRad(this.angles[sides[2][0].toUpperCase()])) 
                / 
                Math.sin(this.toRad(angle[0][1]))          
        }
        else if(D<1) {
          this.status="Two solutions possible"
          
          const X = this.toDeg*Math.asin(D),
                Xalt = 180-this.toDeg*Math.asin(D)
          
          this.alt = {
            sides: this.sides,
            angles: this.angles
          }
          //main
          this.angles[sides[0][0].toUpperCase()] = X
          this.angles[sides[2][0].toUpperCase()] = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
          this.sides[sides[2][0]] = 
                this.sides[angle[0][0].toLowerCase()] 
                * 
                Math.sin(this.toRad(this.angles[sides[2][0].toUpperCase()])) 
                / 
                Math.sin(this.toRad(angle[0][1]))
          
          //alt
          this.alt.angles[sides[0][0].toUpperCase()] = Xalt
          this.alt.angles[sides[2][0].toUpperCase()] = Object.entries(this.alt.angles).reduce((a, b)=>a-b[1], 180)
          
          this.alt.sides[sides[2][0]] = 
                this.alt.sides[angle[0][0].toLowerCase()] 
                * 
                Math.sin(this.toRad(this.alt.angles[sides[2][0].toUpperCase()])) 
                / 
                Math.sin(this.toRad(angle[0][1]))
        }
      },
      SsA: ()=>{
        const angle = Object.entries(this.angles).filter((x)=>!!x[1])
        //sort => long side, short side, unknown side
        const sides = Object.entries(this.sides).sort((a,b)=>b[1] - a[1])
        //long side / short side * angle adjacent to longer side
        
        this.angles[sides[1][0].toUpperCase()] = this.toDeg(Math.asin(Math.sin(this.toRad(angle[0][1])) * sides[1][1] / sides[0][1]))
        
        this.angles[sides[2][0].toUpperCase()] = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
        
        this.sides[sides[2][0]] = 
                this.sides[angle[0][0].toLowerCase()] 
                * 
                Math.sin(this.toRad(this.angles[sides[2][0].toUpperCase()])) 
                / 
                Math.sin(this.toRad(angle[0][1]))
      },
      ASA: ()=>{
        const missingAngle = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
        
        const side = Object.entries(this.sides).filter((x)=>!!x[1]).flat()
        
        Object.entries(this.sides).forEach(entry=> {
          const key = entry[0].toUpperCase()
          if(!this.angles[key]) this.angles[key] = missingAngle
          if(!entry[1]){
            this.sides[entry[0]] = (Math.sin(this.toRad(this.angles[key]))*side[1])/Math.sin(this.toRad(this.angles[key]))
          } 
        })        
      },
  }

  validateInput(){
    const sides = !!this.sides.a + !!this.sides.b + !!this.sides.c
    const angles = !!this.angles.A + !!this.angles.B + !!this.angles.C
    
    this.s = sides
    this.A = angles
    
    if(sides===0) this.status = 'You need to provide at least one side'
    if(sides+angles !==3) this.status = 'You need to provide exactly three values'
    else this.status = 'Valid input'
  }
  
  validateResults(){
    const valid = Math.abs(this.angles.A+this.angles.B+this.angles.C - 180) < 0.1,
          altValid = this.alt ? Math.abs(this.alt.angles.A+this.alt.angles.B+this.alt.angles.C - 180) < 0.1 : null
    console.log(valid, altValid)
    if(valid && altValid) {
      this.status = 'Two solutions possible'
    }
    else if(valid){
      this.status = 'Solved'
    }
    else if(!valid && altValid) {
      this.angles = this.alt.angles
      this.sides = this.alt.sides
    }
    else {
      console.log(this.angles, this.sides)
      this.status = 'Provided values doesnt make up a triangle'
    }
  }
  
  pickAlgorithm(){    
    if(this.s === 3) return 'SSS'
    if(this.A === 2) {
      //pick AAS or ASA
      for(const key in this.sides){
        //check if side has opposite angle
        if(this.sides[key] !== null && this.angles[key.toUpperCase()]){
          return 'AAS'
        }        
      }
      return 'ASA'
    }
    if(this.s === 2) {
      //pick SAS, sSA or SsA, uppercase side longer side
      for(const key in this.angles){
        if(this.angles[key] && this.sides[key.toLowerCase()]) {
          //check if angle is opposite to longer side
          const longer = Object.entries(this.sides)
            .filter(entry=>entry[1]!=null)
            .sort((a,b)=>b[1]-a[1])[0][0]
          return key.toLowerCase() === longer ? 'SsA' : 'sSA'
        }
      }
      return 'SAS'
    }
  }
  
  update(){
    
  }
  draw (height=100){
    const factor = Object.values(this.sides).sort((a,b)=>b-a)[0]/(height*0.9)

    const A = [0,height]
    //A to C
    const C = [this.sides.b/factor, A[1]]    
    
    //C to B        
    const primC = 90 - this.angles.C
    const primB = 180 - 90 - primC
    
    const ratio = this.sides.a / Math.sin(this.toRad(90))
    const h = Math.sin(this.toRad(primB)) * ratio / factor
    const x = Math.sin(this.toRad(primC)) * ratio / factor

    const B = [C[0]-x, C[1]-h]
    
    return [...A,...C,...B].join(' ')
  }
  solve(){
    this.validateInput()
    if(this.status === 'Valid input'){
      //pick algorithm
      const alg = this.pickAlgorithm()
      //use algorithm
      this.algorithmMap[alg]()
      
      //validateResult
      this.validateResults()
      
      if(this.status==='Solved') {
        console.log('solved')
        return {
          angles: this.angles,
          sides: this.sides
        }
      } else if(this.status === 'Two solutions possible') {
        console.log('solved two')
        return [{
          angles: this.angles,
          sides: this.sides
        },{
          angles: this.alt.angles,
          sides: this.alt.sides
        }]
      }
      else return `Error: ${this.status}`
    }
    else return this.status
  }
}

exports.module = Triangle