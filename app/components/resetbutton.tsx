const ResetButton = ({onClick, name}: {onClick: () => void; name: string}) =>{
    return (
        <button onClick={onClick} style={{ margin: '20px', padding: '10px', fontSize: '16px' }}>{name}</button>
    );
}

export default ResetButton;
