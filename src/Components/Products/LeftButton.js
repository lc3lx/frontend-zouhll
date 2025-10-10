import React from 'react'
import next from '../../images/next.png'
const LeftButton = (onClick, disabled) => {
    return (
        <img
            src={next}
            alt=""
            width="35px"
            onClick={onClick}
            disabled={disabled}
            height="35px"
            style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
        />
    )
}

export default LeftButton
