import React from 'react'
import "./style.css";
function ButtonComponent({text, onClick, outlined}) {
  return (
    <div className={outlined ? "outline-btn" : "btn"} onClick={()=>onClick()}>
      {text}
    </div>
  )
}

export default ButtonComponent;
