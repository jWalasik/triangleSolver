"use strict"

interface Sides {
  [key:string]: number | null
}
interface Angles {
  [key:string]: number | null
}
interface Alt {
  sides:Sides
  angles:Angles
}
interface Constructor {
  [index: string]: number | null
}

export default class Triangle {
  sides: Sides
  angles: Angles
  area: number | null
  status: string
  alt: Alt
  s: number
  A: number

  constructor({a=null,b=null,c=null,A=null,B=null,C=null}: Constructor){
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
    this.alt = null
  }
  
  toRad(angle: number){
    return <number>angle*(Math.PI/180)
  }
  toDeg(angle: number){
    return <number>angle*(180/Math.PI)
  }
  
  algorithmMap = {
      SSS: ()=>{
        const computeAngle = (a:number,b:number,c:number) => {
          const result = Math.acos((a**2 + b**2 - c**2)/(2*a*b))
          return this.toDeg(result)
        }
        const a = this.sides.a,
              b = this.sides.b,
              c = this.sides.c
        const C = computeAngle(<number>a, <number>b, <number>c),
              A = computeAngle(<number>c, <number>b, <number>a),
              B = computeAngle(<number>a, <number>c, <number>b);
        this.angles = {
          A: A,
          B: B,
          C: C
        }        
      },
      SAS: ()=>{
        //remove null values, store index
        const side = Object.values(this.sides).filter((x)=>!!x)        
        let angle:any = Object.entries(this.angles).filter(x=>!!x[1]).flat()
        
        //law of cosines to get missing side
        const missingSide = Math.sqrt(side[0]**2 + side[1]**2 - 2*side[0]*side[1]*Math.cos(this.toRad(<any>angle[1])))
        this.sides[angle[0].toLowerCase()] = missingSide
        
        this.algorithmMap['SSS']()
      },
      AAS: ()=>{
        //find missing angle
        const missingAngle = Object.entries(this.angles).reduce((a, b)=>a-b[1], 180)
        const side:any = Object.entries(this.sides).filter((x)=>!!x[1]).flat()
        
        Object.entries(this.sides).forEach(entry=> {
          const key = entry[0].toUpperCase()
          if(!this.angles[key]) this.angles[key] = missingAngle
          if(!entry[1]){
            this.sides[entry[0]] = (Math.sin(this.toRad(this.angles[entry[0].toUpperCase()]))*<any>side[1])/Math.sin(this.toRad(this.angles[side[0].toUpperCase()]))
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
          
          const X = <any>this.toDeg*Math.asin(D),
                Xalt = 180-<any>this.toDeg*Math.asin(D)
          
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
            this.sides[entry[0]] = (Math.sin(this.toRad(this.angles[key]))*<any>side[1])/Math.sin(this.toRad(this.angles[key]))
          } 
        })        
      },
  }

  validateInput(){
    //bool to int conversion
    const sides: number = (+!!this.sides.a) + (+!!this.sides.b) + (+!!this.sides.c)
    const angles: number = (+!!this.angles.A) + (+!!this.angles.B) + (+!!this.angles.C)
    
    this.s = sides
    this.A = angles
    
    if(sides===0) this.status = 'You need to provide at least one side'
    if(sides+angles !==3) this.status = 'You need to provide exactly three values'
    else this.status = 'Valid input'
  }
  
  validateResults(){
    const valid = Math.abs(this.angles.A+this.angles.B+this.angles.C - 180) < 0.1,
          altValid = this.alt ? Math.abs(this.alt.angles.A+this.alt.angles.B+this.alt.angles.C - 180) < 0.1 : null
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
      this.status = 'Provided values doesnt make up a triangle'
    }
  }

  roundResults() {
    Object.keys(this.sides).forEach(key => {
      this.sides[key] = Math.round((this.sides[key] + Number.EPSILON) * 100) / 100
    })
    Object.keys(this.angles).forEach(key => {
      this.angles[key] = Math.round((this.angles[key] + Number.EPSILON) * 100) / 100
    })
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
  
  update({a=null,b=null,c=null,A=null,B=null,C=null}: Constructor){
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
    this.alt = null
  }
  draw (canvas: any){
    const ctx = canvas.getContext('2d')
    const height = canvas.height
    const factor = height / this.sides[Object.keys(this.sides).sort((a,b)=>this.sides[b]-this.sides[a])[0]]

    var Ax=0, Ay=height;
    var Cx = this.sides.b*factor, Cy = Ay      

    const primC = 90 - this.angles.C
    const primB = 180 - 90 - primC
    
    const ratio = this.sides.a / Math.sin(this.toRad(90))
    const h = Math.sin(this.toRad(primB)) * ratio * factor
    const x = Math.sin(this.toRad(primC)) * ratio * factor
    var Bx=Cx-x, By=Cy-h
    
    ctx.beginPath();
    ctx.moveTo(Ax, Ay);
    ctx.lineTo(Cx, Cy);
    ctx.lineTo(Bx, By);
    ctx.closePath();
    ctx.fillStyle="white"; ctx.lineWidth=2;
    ctx.stroke()

    //angles
    ctx.font = "16px Arial black"
    ctx.fillStyle="black"
    ctx.fillText(`A:${this.angles.A}`, Ax+20, Ay-10)
    ctx.fillText(`B:${this.angles.B}`, Bx-20, By+40)
    ctx.fillText(`C:${this.angles.C}`, Cx-60, Cy-10)
    //sides
    ctx.fillText(`a:${this.sides.a}`, height/6, height/2+10)
    ctx.fillText(`b:${this.sides.b}`, canvas.width/2, Ay-10)
    ctx.fillText(`c:${this.sides.c}`, height*0.8, height/2+10)
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
      this.roundResults()
      if(<string>this.status === 'Solved') {
        console.log('solved')
        return {
          angles: this.angles,
          sides: this.sides
        }
      } else if(<string>this.status === 'Two solutions possible') {
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