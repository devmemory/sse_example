import React from 'react';
import styles from './common_btn.module.css';

type BtnProps = {
  children: JSX.Element | string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  backgroundColor?: string,
  color?: string,
  width?: string,
  height?: string,
  margin?: string,
  border?: string,
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
};

export const defaultStyles = {
  backgroundColor: '#64b5f6',
  color: 'white',
  width: "120px",
  height: "40px",
  margin: 'unset',
  border: 'unset'
};

const CommonBtn: React.FC<BtnProps> = (props) => {
  return (
    <button type={props.type ?? 'button'} className={styles.btn_common} onClick={props.onClick} style={{
      '--background-color': props.backgroundColor ?? defaultStyles.backgroundColor,
      '--color': props.color ?? defaultStyles.color,
      '--width': props.width ?? defaultStyles.width,
      '--height': props.height ?? defaultStyles.height,
      '--margin': props.margin ?? defaultStyles.margin,
      '--border': props.border ?? defaultStyles.border
    } as React.CSSProperties} disabled={props.disabled}>{props.children}
    </button>
  );
};

export default CommonBtn;