import '../css/resetButton.css';

const ResetButton = ({onClick, name}: {onClick: () => void; name: string}) => {
    return (
        <button onClick={onClick} className="reset-button">{name}</button>
    );
}

export default ResetButton;
