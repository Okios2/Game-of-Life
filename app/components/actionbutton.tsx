import styles from "./actionButton.module.css"

const ActionButton = ({onClick, name}: {onClick: () => void; name: string}) => {
    return (
        <button onClick={onClick} className={styles.actionbutton}>{name}</button>
    );
}

export default ActionButton;
