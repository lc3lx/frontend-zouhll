import React from 'react'
import prev from '../../images/prev.png'
const RightButton = (onClick, disabled) => {
    return (
        <img
            src={prev}
            alt=""
            width="35px"
            onClick={onClick}
            disabled={disabled}
            height="35px"
            style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
        />
    )
}


export default RightButton
