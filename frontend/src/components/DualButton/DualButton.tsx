import './DualButton.css';

interface Props
{
    label?: string;
    leftLabel: string;
    rightLabel: string;
    onChooseLeft: ()=>void;
    onChooseRight: ()=>void;
    state: boolean;
}

const DualButton = ({ label, leftLabel, rightLabel, onChooseLeft, onChooseRight, state }: Props) =>
{
    const onClickLeftButton = () =>
    {
        onChooseLeft();
    };

    const onClickRightButton = () =>
    {
        onChooseRight();
    };

    if (state)
    {
        return (
            <>
                <div className='flex-center align-items-center width-fit-content'>
                    { label && <span>{label}</span> }
                    <div className='flex-dual-button'>
                        <button className='left-button-selected' onClick={onClickLeftButton}>{leftLabel}</button>
                        <button className='right-button' onClick={onClickRightButton}>{rightLabel}</button>
                    </div>
                </div>
            </>
        );
    }
    else
    {
        return (
            <>
                <div className='flex-center align-items-center width-fit-content'>
                    { label && <span>{label}</span> }
                    <div className='flex-dual-button'>
                        <button className='left-button' onClick={onClickLeftButton}>{leftLabel}</button>
                        <button className='right-button-selected' onClick={onClickRightButton}>{rightLabel}</button>
                    </div>
                </div>
            </>
        );
    }
};

export default DualButton;