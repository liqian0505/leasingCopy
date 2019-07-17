import React from 'react'
import { Icon } from 'antd'
import styles from './CustomInput.css'

const CustomInput = props => (
  <input className={styles.className} placeholder={props.placeholder} />
);

export default CustomInput;