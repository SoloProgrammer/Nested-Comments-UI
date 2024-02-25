import React from "react";
import { IconType } from "react-icons";
import styles from "./Iconbtn.module.css";

type IconBtnPropsType = {
  children?: React.ReactNode;
  Icon: IconType;
  color?: "danger" | "primary";
  onClick?: () => void;
  className?: string;
};

const IconBtn = ({
  children,
  className,
  Icon,
  onClick,
  color,
  ...props
}: IconBtnPropsType) => {
  return (
    <button {...props} onClick={onClick} className={styles.iconBtn}>
      <span
        className={`${styles.icon} ${className} ${color ? styles[color] : ""}`}
      >
        <Icon />
        {children}
      </span>
    </button>
  );
};

export default IconBtn;
