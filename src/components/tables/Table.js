import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HeaderRow from './HeaderRow'
import Row from './Row'
import {getStyle} from './Style'
import ColumnFilter from './ColumnFilter'
import './Table.css'
import styles from '../../styles.css'
import MenuBar from './MenuBar'
import ColumnVisibility from './ColumnVisibility'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnInfoHidden: true,
            columnFilter: {
            },
            columnVisibility: {
                isActive: false,
                data: {}
            },
            filteredRowIdList: []
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        nextProps.tableData.columns.map((columnInfo) => {
            this.state.columnFilter[columnInfo.field] = {
                isFilterActive: false,
                columnId: columnInfo.field,
                filteredValues: [],
                filteredRows: []
            }
            this.state.columnVisibility.data[columnInfo.field] = {isHidden: false}
        })

        var currentFilteredIdList = Object.keys(nextProps.tableData.data).map((rowId) => {
            return nextProps.tableData.data[rowId].id
        })
        var newState = {...this.state, ...{}}
        newState.filteredRowIdList = currentFilteredIdList
        this.setState(newState)
    }

    updateLevel(rowDataList, rowData, level) {
        rowData['level'] = level
        if (rowData.childList !== undefined) {
            rowData.childList.map((childRowIndex) => {
                var childRowData = rowDataList[childRowIndex]
                if (childRowData.level === undefined) {
                    this.updateLevel(rowDataList, childRowData, level + 1)
                }
            })
        }
    }

    triggerRow = (rowId) => {
        var rowInfo = this.props.tableData.data[rowId]
        if (rowInfo.collapsed) {
            rowInfo.collapsed = undefined
        } else {
            rowInfo.collapsed = true
        }
    }

    generateColumnFilterState(isFilterActive, filteredRows, x, y, columnId) {
        return {
            mouseX: x,
            mouseY: y,
            isFilterActive: isFilterActive,
            filteredRows: filteredRows,
            columnId: columnId
        }
    }

    toggleFilter = (x, y, columnId) => {
        var newState = {...this.state, ...{}}

        this.props.tableData.columns.map((columnInfo) => {
            this.closeColumnFilter(columnInfo.field)
        })

        var offset = 1920 - 300
        if (x > offset) {
            x = offset
        }

        if (newState.columnFilter[columnId] !== undefined) {
            if (newState.columnFilter[columnId].isFilterActive) {
                newState.columnFilter[columnId].isFilterActive = false
            } else {
                newState.columnFilter[columnId].isFilterActive = true
                newState.columnFilter[columnId].mouseX = x
                newState.columnFilter[columnId].mouseY = y
                newState.columnFilter[columnId].columnId = columnId
            }
        }
        this.setState(newState)
    }

    toggleFilterRow = (colId, value, rowIdList) => {
        var newState = {...this.state, ...{}}
        var columnFilter = newState.columnFilter[colId]
        if (columnFilter.filteredValues.includes(value)) {
            var index = columnFilter.filteredValues.indexOf(value)
            columnFilter.filteredValues.splice(index, 1)
        } else {
            columnFilter.filteredValues.push(value)
        }

        var currentFilteredIdList = Object.keys(this.props.tableData.data).map((rowId) => {
            return rowId
        })
        Object.keys(this.state.columnFilter).map((columnId) => {
            var columnFilteredRowIdList = []
            // var columnId = "total_quantity"
            var columnFilter = this.state.columnFilter[columnId]
            var rowValues = this.getRowValues(columnId)
            columnFilter.filteredValues.map((value) => {
                rowValues[value].rowIdList.map((rowId) => {
                    columnFilteredRowIdList[rowId] = rowId
                })
            })
            columnFilteredRowIdList = Object.keys(columnFilteredRowIdList)
            var bufferFilteredIdList = []
            if (columnFilteredRowIdList.length === 0) {
                bufferFilteredIdList = currentFilteredIdList
            } else if (currentFilteredIdList.length === 0) {
                bufferFilteredIdList = columnFilteredRowIdList
            } else {
                currentFilteredIdList.map((currentFilteredId) => {
                    if (columnFilteredRowIdList.includes(currentFilteredId)) {
                        bufferFilteredIdList.push(currentFilteredId)
                    }
                })
            }

            currentFilteredIdList = bufferFilteredIdList
        })
        newState.filteredRowIdList = currentFilteredIdList

        this.setState(newState)
    }

    getRowValues = (columnId) => {
        var rowValues = []
        Object.keys(this.props.tableData.data).map((rowId) => {
            var rowInfo = this.props.tableData.data[rowId]
            var cellInfo = rowInfo[columnId]
            // var cellValues = [{value: cellInfo.value, renderedValue: cellInfo.value}]

            if (cellInfo !== undefined) {
                var cellValues = []
                if (cellInfo.filterFunc === undefined) {
                    cellValues = [{value: cellInfo.value, renderedValue: cellInfo.value}]
                } else {
                    cellValues = cellInfo.filterFunc(this.props.tableData.source, rowId, columnId)
                }
                cellValues.map((cellValue) => {
                    cellValue.rowId = rowId
                })
                rowValues = rowValues.concat(cellValues)
            } else {
                cellValues = [{value: ' ', renderedValue: ' ', rowId: rowId}]
                rowValues = rowValues.concat(cellValues)
            }
        })

        var filteredValues = {}
        rowValues.map(rowValue => {
            if (filteredValues[rowValue.value] === undefined) {
                filteredValues[rowValue.value] = {renderedValue: rowValue.renderedValue, rowIdList: [rowValue.rowId]}
            } else {
                filteredValues[rowValue.value].rowIdList.push(rowValue.rowId)
            }
        })
        return filteredValues
    }

    submitColumnFilter = (columnId) => {
        var currentFilteredIdList = Object.keys(this.props.tableData.data).map((rowId) => {
            return rowId
        })
        Object.keys(this.state.columnFilter).map((columnId) => {
            var columnFilteredRowIdList = []
            // var columnId = "total_quantity"
            var columnFilter = this.state.columnFilter[columnId]
            var rowValues = this.getRowValues(columnId)
            columnFilter.filteredValues.map((value) => {
                rowValues[value].rowIdList.map((rowId) => {
                    columnFilteredRowIdList[rowId] = rowId
                })
            })
            columnFilteredRowIdList = Object.keys(columnFilteredRowIdList)
            var bufferFilteredIdList = []
            if (columnFilteredRowIdList.length === 0) {
                bufferFilteredIdList = currentFilteredIdList
            } else if (currentFilteredIdList.length === 0) {
                bufferFilteredIdList = columnFilteredRowIdList
            } else {
                currentFilteredIdList.map((currentFilteredId) => {
                    if (columnFilteredRowIdList.includes(currentFilteredId)) {
                        bufferFilteredIdList.push(currentFilteredId)
                    }
                })
            }

            currentFilteredIdList = bufferFilteredIdList
        })

        var newState = {...this.state, ...{}}
        newState.filteredRowIdList = currentFilteredIdList
        newState.columnFilter[columnId].isFilterActive = false
        this.setState(newState)
    }

    onClickInTable = (e) => {
        this.closeAllColumnFilters()
    }

    closeAllColumnFilters = () => {
        this.props.tableData.columns.map((columnInfo) => {
            this.closeColumnFilter(columnInfo.field)
        })
    }

    closeColumnFilter = (columnId) => {
        var newState = {...this.state, ...{}}
        newState.columnFilter[columnId].isFilterActive = false
        this.setState(newState)
    }

    toogleColumnVisibilityContainer = (x, y) => {
        this.state.columnVisibility.isActive = !this.state.columnVisibility.isActive
        this.state.columnVisibility.mouseX = x
        this.state.columnVisibility.mouseY = y
    }

    hideColumnVisibility = () => {
        this.state.columnVisibility.isActive = false
    }

    render() {
        var tableData = JSON.parse(JSON.stringify(this.props.tableData))
        tableData.sourceTableData = this.props.tableData
        if (tableData.data !== undefined) {
            var dataMap = {}
            tableData.data.forEach((rowInfo) => {
                dataMap[rowInfo.id] = rowInfo
            })
            tableData.data = dataMap
            var idList = Object.keys(tableData.data).sort((a, b) => { return (parseInt(a) >= parseInt(b)) ? 1 : -1 })
            idList.map((id) => {
                var rowData = tableData.data[id]
                if (rowData.level === undefined) {
                    this.updateLevel(tableData.data, rowData, 0)
                }
            })
            var entryPointsList = tableData.entryPoints
            if (tableData.entryPoints === undefined) {
                entryPointsList = Object.keys(tableData.data).map((rowId) => { return rowId })
            }
            entryPointsList = entryPointsList.sort((a, b) => { return (parseInt(a) >= parseInt(b)) ? 1 : -1 })
            var tbody = entryPointsList.map((id) => {
                var rowData = tableData.data[id]
                return (
                    <Row key={rowData.id} rowDataId={rowData.id} tableData={tableData} filteredRowIdList={this.state.filteredRowIdList} triggerRow={this.triggerRow} columnVisibility={this.state.columnVisibility} />
                )
            })

            idList.map((id) => {
                tableData.data[id].rendered = undefined
            })

            var columnFilters = Object.keys(this.state.columnFilter).map((colId) => {
                return (
                    <ColumnFilter
                        key={colId}
                        tableData={this.props.tableData}
                        columnFilter={this.state.columnFilter[colId]}
                        closeColumnFilter={this.closeColumnFilter}
                        toggleFilterRow={this.toggleFilterRow}
                        submitColumnFilter={this.submitColumnFilter}
                        getRowValues={this.getRowValues}
                    />)
            })

            var columnVisibilityContainer = <ColumnVisibility tableData={tableData} columnVisibility={this.state.columnVisibility} hideColumnVisibility={this.hideColumnVisibility} />

            return (
                <div className={styles.tableContainer} onClick={(e) => { this.onClickInTable(e) }}>
                    {columnFilters}
                    {columnVisibilityContainer}
                    <MenuBar tableData={tableData} toogleColumnVisibilityContainer={this.toogleColumnVisibilityContainer} />
                    <table style={getStyle(tableData.style, this.props)}>
                        <HeaderRow tableData={tableData} toggleFilter={this.toggleFilter} columnFilter={this.state.columnFilter} columnVisibility={this.state.columnVisibility} />
                        <tbody>
                            {tbody}
                        </tbody>
                    </table>
                </div>
            )
        }

        return <React.Fragment />
    }
}

Table.propTypes = {
    tableData: PropTypes.object.isRequired
}

export default Table
