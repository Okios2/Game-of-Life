import styles from "./actionButton.module.css"

const ActionButton = ({onClick, name, disabled = false}: {onClick: () => void, name: string, disabled?: boolean}) => {
    return (
        <button onClick={onClick} className={styles.actionbutton} disabled={disabled}>{name}</button>
    );
}

export default ActionButton;
