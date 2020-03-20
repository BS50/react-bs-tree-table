import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faColumns} from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles.css'

class MenuBar extends Component {
    render() {
        let ret = <React.Fragment />
        if (this.props.tableData.columnVisibility) {
            ret = <div>
                <button
                    className={styles.transparentButton}
                    onClick={(e) => { this.props.toogleColumnVisibilityContainer(e.pageX, e.pageY) }}
                >
                    <FontAwesomeIcon icon={faColumns} />
                </button>
            </div>
        }
        return ret
    }
}

MenuBar.propTypes = {
    tableData: PropTypes.object.isRequired,
    toogleColumnVisibilityContainer: PropTypes.func.isRequired
}

export default MenuBar
