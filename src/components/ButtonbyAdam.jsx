/* eslint-disable react/prop-types */
import './ButtonbyAdam.css'

export function ButtonbyAdam({ content, link }) {
    return (
        <a href={link}  target="_blank">
            <button className='btn-adam'>
                {content}
                <span></span>
            </button>
        </a>
    )
}
