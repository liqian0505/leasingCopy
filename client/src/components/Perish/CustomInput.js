import React from 'react'
import { Input } from 'antd'
import styles from './CustomInput.css'

class CustomInput extends React.Component {
  render() {
    return (
      <Input
        className={styles.container}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        onPressEnter={e => {
          document.activeElement.blur()
          const { id } = this.props.record
          delete this.props.record['id']

          this.props.onChange(id, {
            ...this.props.record,
            name: e.target.value,
          })
        }} />
    )
  }
}
export default CustomInput;