import './InputContact.css'

// eslint-disable-next-line react/prop-types
export function TextAreaContact({handleChange, value}) {
    return (
        <div className="group p-5 overflow-hidden resize-none">
            <textarea 
            onChange={handleChange} 
            className='input text-area text-xl' 
            name="message" id=""
            value={value}
            ></textarea>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className=''>Mensaje</label>
        </div>
    )
}
