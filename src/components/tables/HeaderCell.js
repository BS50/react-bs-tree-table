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
        let buttonClassName = [styles.filterButton, styles.transparentButton]
        if (this.props.columnFilter !== undefined && this.props.columnFilter.filteredValues.length > 0) {
            buttonClassName.push(styles.activeFilter)
        }
        buttonClassName = buttonClassName.join(' ')

        if (this.props.serviceTableData.tableData.filterActive) {
            return <button className={buttonClassName} onClick={(e) => {
                e.stopPropagation()
                this.props.toggleFilter(e.pageX, e.pageY, this.props.columnInfo.field)
            }}>
                <FontAwesomeIcon icon={faFilter} />
            </button>
        }
        return <React.Fragment />
    }

    render() {
        if (this.props.columnInfo !== undefined) {
            return (
                <th style={getStyle(this.props.columnInfo.style, this.props)} key={this.props.columnInfo.field}>
                    {renderHeaderCell(this.props.columnInfo.renderer, this.props.serviceTableData, this.props.columnInfo)}
                    {this.getFilterIcon()}
                </th>
            )
        }

        return <React.Fragment />
    }
}

HeaderCell.propTypes = {
    serviceTableData: PropTypes.object.isRequired,
    columnInfo: PropTypes.object.isRequired,
    columnFilter: PropTypes.object,
    toggleFilter: PropTypes.func.isRequired
}

export default HeaderCell
