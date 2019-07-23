import React from 'react'
import styles from './CustomModal.css'
import { CSSTransition } from 'react-transition-group'

class CustomModal extends React.Component {
  render() {

    const transition = {
      enter: styles["modal-enter"],
      enterActive: styles["modal-enterActive"],
      exit: styles["modal-exit"],
      exitActive: styles["modal-exitActive"]
    }

    const containerStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }

    return (
      <CSSTransition timeout={10000} in={this.props.in} classNames={transition} unmountOnExit>
        <div className={styles.container} style={containerStyle}>
          {this.props.children}
        </div>
      </CSSTransition>
    )
  }
}

export default CustomModal