import React, {FC, HTMLAttributes} from "react";
import css from './background.module.scss'
import cn from "classnames";


const Background: FC<HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return <div className={cn(css.root, className)}>
        {children}
    </div>
}
export default Background
