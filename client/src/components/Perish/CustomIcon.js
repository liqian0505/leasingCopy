import React from 'react'
import { Icon } from 'antd'
import styles from './CustomIcon.css'

const CustomIcon = props => (
  <span className={styles.container} onClick={e => { props.onClick(props.id) }}>
    <a><Icon type={props.type} /></a>
  </span>
);

export default CustomIcon;
