import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ExampleComponent1 from './components/ExampleComponent1'
import Table from './components/tables/Table'
// import './components/tables/Table.css'

class ExampleComponent extends Component {
    static propTypes = {
        text: PropTypes.string
    }

    render() {
        const {text} = this.props
        return (
            <div className='test' >
                <button className={styles.transparentButton}>sfsd</button>
                Example Component2: {text}]
            </div>
        )
    }
}

export {ExampleComponent, ExampleComponent1, Table}
