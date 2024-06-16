import './InputContact.css'

// eslint-disable-next-line react/prop-types
export function InputContact({ labelCont, nameCont, handleChange, value }) {
    return (
        <div className="group">
            <input 
            required="" 
            type="text" 
            name={nameCont} 
            className="input" 
            onChange={handleChange} 
            value={value}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{labelCont}</label>
        </div>
    )
}
