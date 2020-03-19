import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

class Row extends Component {
    componentDidMount() {
    }

    getRow = () => {
        var rowData = this.props.tableData.data[this.props.rowDataId]
        var row = this.props.tableData.columns.map((columnInfo) => {
            var columnVisibilityData = this.props.columnVisibility.data[columnInfo.field]
            if (columnVisibilityData !== undefined && !columnVisibilityData.isHidden) {
                return (
                    <Cell key={columnInfo.field}
                          tableData={this.props.tableData}
                          rowDataId={this.props.rowDataId}
                          columnInfo={columnInfo}
                          triggerRow={this.props.triggerRow}
                    />
                )
            } else {
                return <React.Fragment key={columnInfo.field}></React.Fragment>
            }
        })
        if (this.props.filteredRowIdList.includes(this.props.rowDataId)) {
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
        if (this.props.tableData !== undefined) {
            var rowData = this.props.tableData.data[this.props.rowDataId]
            var row = this.getRow()
            var rowList = [row]
            if (rowData['collapsed'] !== true && rowData.childList !== undefined) {
                rowList = rowList.concat(
                    rowData.childList.map(childRowId => {
                        return <Row
                            key={childRowId}
                            rowDataId={childRowId}
                            tableData={this.props.tableData}
                            filteredRowIdList={this.props.filteredRowIdList}
                            triggerRow={this.props.triggerRow}
                            columnVisibility={this.props.columnVisibility} />
                    })
                )
            }

            console.log('rowList ' + this.props.rowDataId)
            console.log(rowList)
            return rowList
        }

        return <React.Fragment />
    }
}

Row.propTypes = {
    tableData: PropTypes.object.isRequired,
    triggerRow: PropTypes.func.isRequired,
    columnVisibility: PropTypes.object.isRequired,
    filteredRowIdList: PropTypes.array.isRequired,
    rowDataId: PropTypes.number.isRequired
}

export default Row
