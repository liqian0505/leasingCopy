import React from 'react'
import { Icon, Tooltip } from 'antd'
import styles from './CustomIcon.css'

const CustomIcon = props => (
  <span className={styles.container} onClick={e => { props.onClick(props.parameters) }}>
    <Tooltip title={props.title}>
      <a><Icon type={props.type} /></a>
    </Tooltip>
  </span>
);

export default CustomIcon;
