/* eslint-disable react/prop-types */
import './ButtonCircles.css'

export function ButtonCircles({type}) {
    return (
        <button className='button-circle' type={type} /* onClick={handleReset} */>
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Enviar mail</span>
        </button>
    )
}
