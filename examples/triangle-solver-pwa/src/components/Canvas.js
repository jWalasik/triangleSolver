import React from 'react'

const Canvas = ({triangle}) => {
  const canvasRef = React.useRef(null)
  React.useEffect(()=>{
    triangle.draw(canvasRef.current, 'white')
  })
  
  return (
    <canvas 
      className="canvas"
      ref={canvasRef}
      width={300}
      height={300}
    />
  )
}

export default Canvas