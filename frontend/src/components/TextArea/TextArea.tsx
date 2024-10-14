
import './TextArea.css'

interface Props {
    label?: string;
    defaultText?: string;
    rows?: number;
    cols?: number;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>)=>void;
}

const TextArea = ({label, defaultText, rows, cols, onChange}: Props) =>
{
    return (
        <>
            <div className="input-flex">
                <label htmlFor={label}>{label}</label>
                <textarea id={label} onChange={onChange} rows={rows} cols={cols} value={defaultText} className='text-area'></textarea>
            </div>
        </>
    );
}

export default TextArea;