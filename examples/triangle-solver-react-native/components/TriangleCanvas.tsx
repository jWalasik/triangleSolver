import React from 'react'
import Canvas from 'react-native-canvas'

const Inputs = ({triangle}) => {
  const canvasRef = React.useRef(null)
  React.useEffect(()=>{
    canvasRef.current.width = 250
    canvasRef.current.height = 250
    triangle.draw(canvasRef.current, 'white')
  })

  return (
    <Canvas ref={canvasRef} />
  )
}

export default Inputs