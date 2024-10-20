import {ButtonHTMLAttributes, FC} from "react";
import css from './button.module.scss'
import cn from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'large' | 'small' | 'default'
}
const Button: FC<ButtonProps> = (props) => {
    return <button
        {...props}
        className={cn(
            css.root,
            props.className,
            props.disabled && css.disabled,
            props.size === 'small' && css.small,
            props.size === 'large' && css.large
        )}
        >
        {props.children}
    </button>
}
export default Button
