import React from 'react'

const Canvas = ({triangle}) => {
  const canvasRef = React.useRef(null)
  React.useEffect(()=>{
    triangle.draw(canvasRef.current)
  })
  console.log('canvas', Date.now())
  return (
    <canvas 
      ref={canvasRef}
      width={300}
      height={300}
    />
  )
}

export default Canvas