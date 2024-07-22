import styles from './resetButton.module.css'

const ResetButton = ({onClick, name}: {onClick: () => void; name: string}) => {
    return (
        <button onClick={onClick} className={styles.resetbutton}>{name}</button>
    );
}

export default ResetButton;
