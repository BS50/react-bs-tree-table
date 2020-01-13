import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {getCellStyle, renderCell} from './Style'
import C from './C'

class Cell extends Component {
    componentDidMount() {
    }

    getGroupButtonStyle = () => {
        return {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none'
        }
    }

    getGroupButtonIcon = () => {
        var rowData = this.props.tableData.data[this.props.rowDataId]
        if (rowData.collapsed) {
            return faChevronRight
        }
        return faChevronDown
    }

    getGroupButton = () => {
        var rowData = this.props.tableData.data[this.props.rowDataId]
        return (
            <button style={this.getGroupButtonStyle()} onClick={(e) => this.props.triggerRow(rowData['id'])}>
                <FontAwesomeIcon icon={this.getGroupButtonIcon()} />
            </button>
        )
    }

    render() {
        var columnId = this.props.columnInfo['field']
        var rowData = this.props.tableData.data[this.props.rowDataId]
        var cellInfo = rowData[columnId]
        var isCellWithGroupButton = false
        if (rowData.childList !== undefined && rowData.childList.length > 0 && this.props.columnInfo.grouped) {
            isCellWithGroupButton = true
        }
        if (cellInfo !== undefined) {
            var style = getCellStyle(this.props.tableData.defaultCellStyle, cellInfo.style, this.props)

            if (this.props.columnInfo.grouped === true) {
                var padding = rowData['level'] * C.LEVEL_PX_STEP
                style.paddingLeft = '' + padding + 'px'
            }
            if (isCellWithGroupButton) {
                return <td style={style}>{this.getGroupButton()}{renderCell(cellInfo.render, this.props.tableData, this.props.rowDataId, columnId)}</td>
            } else {
                return <td style={style}>{renderCell(cellInfo.render, this.props.tableData, this.props.rowDataId, columnId)}</td>
            }
        }

        return <td style={getCellStyle(this.props.tableData.defaultCellStyle, undefined, this.props)} />
    }
}

Cell.propTypes = {
    tableData: PropTypes.object.isRequired,
    triggerRow: PropTypes.func.isRequired,
    rowDataId: PropTypes.number.isRequired,
    columnInfo: PropTypes.object.isRequired,
}

export default Cell
