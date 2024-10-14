import AlertTypes from "../../enums/AlertTypes";
import "./Alert.css"

interface Props
{
    message?: string;
    onClose?: ()=>void;
    type: AlertTypes;
}

const Alert = ({ message, onClose, type }: Props) =>
{
    return (
        <>
            <div className={"alert " + type}>
                <span>{message}</span>
                <span className="btn-alert-close" onClick={onClose}>&times;</span>
            </div>
        </>
    );
}

export default Alert;