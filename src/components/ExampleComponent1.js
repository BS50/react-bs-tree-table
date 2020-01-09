import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles.css'

class ExampleComponent1 extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={[styles.test, styles.test1].join(' ')}>
        Example11111 Component: {text}
      </div>
    )
  }
}

export default ExampleComponent1
