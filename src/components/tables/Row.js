import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

class Row extends Component {
    componentDidMount() {
    }

    getRow = () => {
        var rowData = this.props.tableData.data[this.props.rowDataId]
        var row = this.props.tableData.columns.map((columnInfo) => {
            if (columnInfo.columnHidden) {
                return <React.Fragment key={columnInfo.field}></React.Fragment>
            } else {
                return (
                    <Cell key={columnInfo.field}
                        tableData={this.props.tableData}
                        rowDataId={this.props.rowDataId}
                        columnInfo={columnInfo}
                        triggerRow={this.props.triggerRow}
                    />
                )
            }
        })
        if (this.props.filteredRowIdList.includes(this.props.rowDataId.toString())) {
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
                            triggerRow={this.props.triggerRow} />
                    })
                )
            }

            return rowList
        }

        return <React.Fragment />
    }
}

Row.propTypes = {
    tableData: PropTypes.object.isRequired,
    triggerRow: PropTypes.func.isRequired,
    filteredRowIdList: PropTypes.array.isRequired,
    rowDataId: PropTypes.number.isRequired
}

export default Row
