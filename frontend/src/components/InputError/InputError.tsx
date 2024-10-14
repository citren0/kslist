import warning_image from './../../../assets/warning.png'
import './InputError.css'

interface Props
{
    text: string;
}

const InputError = ({text}: Props) => 
{
    return (
        <>
            <div className="flex-warning" aria-invalid={true}>
                <img src={warning_image} alt="warning icon" height={16} className='warning-image-relative' />
                <small className='error-text'>{text}</small>
            </div>
        </>
    );
}

export default InputError;