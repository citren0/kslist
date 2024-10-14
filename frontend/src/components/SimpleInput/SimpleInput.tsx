
import { useState } from 'react';
import './SimpleInput.css'

interface Props {
    label?: string;
    type?: string;
    defaultText?: string;
    image: string;
    placeholder?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>)=>void;
}

const SimpleInput = ({label, type, image, defaultText, placeholder, onChange}: Props) =>
{
    const [ hasFocus, setHasFocus ] = useState(false);

    return (
        <>
            <div className='form-item-outer-wrapper'>
                <div className='input-flex'>
                    <img className='input-side-image' src={image} height='26' />
                    <input id={label} className='input-with-side-image' type={type ?? 'text'} placeholder={placeholder ?? ''} value={defaultText} onChange={onChange} onFocus={() => setHasFocus(true)} onBlur={() => setHasFocus(false)} />
                </div>
                <hr className={'hr-no-space' + (hasFocus ? ' blue' : '')} />
            </div>
        </>
    );
}

export default SimpleInput;