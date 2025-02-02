import styles from './Button.module.css';

interface ButtonProps {
    children: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger';
    onClick: () => void;
}

const Button = ({ children, onClick, color = 'primary'}: ButtonProps) => {

    return <button type="button"
            className={[styles.btn, styles[`btn-${color}`]].join(' ')}
            onClick={onClick}>
                {children}
            </button>
    }

export default Button;