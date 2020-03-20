import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

class Row extends Component {
    componentDidMount() {
    }

    getRow = () => {
        const rowDataInfo = this.props.rowDataInfo
        const rowData = rowDataInfo.data
        const row = this.props.serviceTableData.columns.map((columnInfo) => {
            const columnVisibilityData = this.props.columnVisibility.data[columnInfo.field]
            if (columnVisibilityData !== undefined && !columnVisibilityData.isHidden) {
                return (
                    <Cell key={columnInfo.field}
                        serviceTableData={this.props.serviceTableData}
                        rowDataInfo={rowDataInfo}
                        columnInfo={columnInfo}
                        triggerRow={this.props.triggerRow}
                    />
                )
            } else {
                return <React.Fragment key={columnInfo.field}></React.Fragment>
            }
        })
        if (rowDataInfo.filtered) {
            return (
                <tr key={rowData.id}>
                    {row}
                </tr>
            )
        } else {
            return <React.Fragment key={rowData.id} />
        }
    }

    render() {
        if (this.props.serviceTableData !== undefined) {
            const rowDataInfo = this.props.rowDataInfo
            const rowData = rowDataInfo.data
            const row = this.getRow()
            let rowList = [row]
            if (this.props.serviceTableData.data[rowData.id].collapsed !== true && rowData.childList !== undefined) {
                rowList = rowList.concat(
                    rowData.childList.map(childRowId => {
                        const childRowDataInfo = this.props.serviceTableData.data[childRowId]
                        return <Row
                            key={childRowId}
                            rowDataInfo={childRowDataInfo}
                            serviceTableData={this.props.serviceTableData}
                            triggerRow={this.props.triggerRow}
                            columnVisibility={this.props.columnVisibility}
                        />
                    })
                )
            }
            return rowList
        }

        return <React.Fragment />
    }
}

Row.propTypes = {
    serviceTableData: PropTypes.object.isRequired,
    rowDataInfo: PropTypes.object.isRequired,
    triggerRow: PropTypes.func.isRequired,
    columnVisibility: PropTypes.object.isRequired
}

export default Row
