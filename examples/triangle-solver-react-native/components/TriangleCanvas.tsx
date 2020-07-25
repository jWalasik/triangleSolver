import React from 'react'
import Canvas from 'react-native-canvas'

const Inputs = ({triangle}) => {
  const canvasRef = React.useRef(null)
  React.useEffect(()=>{
    triangle.draw(canvasRef.current, '#ffffff')
  })

  return (
    <Canvas 
      ref={canvasRef}
      style={{
        flex: 1, 
        alignSelf: 'center',
        backgroundColor: 'red'
      
      }}
    />
  )
}

export default Inputs