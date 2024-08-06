import styles from "./actionButton.module.css"

const ActionButton = ({onClick, name, disabled = false, index}: {onClick: (index: number) => void, name: string, disabled?: boolean, index: number}) => {
    return (
        <button onClick={() => onClick(index)} className={styles.actionbutton} disabled={disabled}>{name}</button>
    );
}

export default ActionButton;
