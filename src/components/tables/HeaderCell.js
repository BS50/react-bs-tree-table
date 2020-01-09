import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {getStyle, renderHeaderCell} from './Style'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import styles from '../../styles.css'

class HeaderCell extends Component {
    componentDidMount() {
    }

    getFilterIcon = () => {
        var buttonClassName = [styles.filterButton, styles.transparentButton]
        if (this.props.columnFilter !== undefined && this.props.columnFilter.filteredValues.length > 0) {
            buttonClassName.push(styles.activeFilter)
        }
        buttonClassName = buttonClassName.join(' ')

        if (this.props.tableData.filterActive) {
            return <button className={buttonClassName} onClick={(e) => {
                e.stopPropagation()
                this.props.toggleFilter(e.pageX, e.pageY, this.props.info.field)
            }}>
                <FontAwesomeIcon icon={faFilter} />
            </button>
        }
        return <React.Fragment />
    }

    render() {
        if (this.props.info !== undefined) {
            return (
                <th style={getStyle(this.props.info.style, this.props)} key={this.props.info.field}>
                    {renderHeaderCell(this.props.info.renderer, this.props.tableData, this.props.info)}
                    {this.getFilterIcon()}
                </th>
            )
        }

        return <React.Fragment />
    }
}

HeaderCell.propTypes = {
    tableData: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    columnFilter: PropTypes.object,
    toggleFilter: PropTypes.func.isRequired
}

export default HeaderCell
