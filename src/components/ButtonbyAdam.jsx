/* eslint-disable react/prop-types */
import './ButtonbyAdam.css'

export function ButtonbyAdam({ content, link }) {
    return (
        <a href={link}  target="_blank">
            <button className='sm:w-70 sm:m-auto sm:mb-1 btn-adam'>
                {content}
                <span></span>
            </button>
        </a>
    )
}
