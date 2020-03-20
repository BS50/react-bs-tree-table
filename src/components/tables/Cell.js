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
        if (this.props.serviceTableData.data[this.props.rowDataInfo.data.id].collapsed) {
            return faChevronRight
        }
        return faChevronDown
    }

    getGroupButton = () => {
        return (
            <button style={this.getGroupButtonStyle()} onClick={
                (e) => this.props.triggerRow(this.props.rowDataInfo.data.id)
            }>
                <FontAwesomeIcon icon={this.getGroupButtonIcon()} />
            </button>
        )
    }

    render() {
        const columnId = this.props.columnInfo['field']
        const rowDataInfo = this.props.rowDataInfo
        const rowData = rowDataInfo.data
        const cellInfo = rowData[columnId]
        let isCellWithGroupButton = false
        if (rowData.childList !== undefined && rowData.childList.length > 0 && this.props.columnInfo.grouped) {
            isCellWithGroupButton = true
        }
        if (cellInfo !== undefined) {
            let style = getCellStyle(this.props.serviceTableData.tableData.defaultCellStyle, cellInfo.style, this.props)

            if (this.props.columnInfo.grouped === true) {
                const padding = rowDataInfo.level * C.LEVEL_PX_STEP
                style.paddingLeft = '' + padding + 'px'
            }
            if (isCellWithGroupButton) {
                return <td style={style}>
                    {this.getGroupButton()}
                    {renderCell(cellInfo.render, this.props.serviceTableData, rowData, columnId)}
                </td>
            } else {
                return <td style={style}>
                    {renderCell(cellInfo.render, this.props.serviceTableData, rowData, columnId)}
                </td>
            }
        }

        return <td style={getCellStyle(this.props.serviceTableData.tableData.defaultCellStyle, undefined, this.props)} />
    }
}

Cell.propTypes = {
    serviceTableData: PropTypes.object.isRequired,
    triggerRow: PropTypes.func.isRequired,
    rowDataInfo: PropTypes.object.isRequired,
    columnInfo: PropTypes.object.isRequired
}

export default Cell
