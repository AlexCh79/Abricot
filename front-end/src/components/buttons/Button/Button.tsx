import styles from './Button.module.scss'

export const Button = ({label}: string) => {
    return (
        <button className={styles.btnBlack}>
            {label}
        </button>
    )
}