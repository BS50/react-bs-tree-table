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
            serviceTableData: {}
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        let newState = {...this.state, ...{}}

        if (nextProps.tableData.data !== undefined) {
            let serviceTableData = {}
            serviceTableData.tableData = nextProps.tableData
            serviceTableData.columns = nextProps.tableData.columns
            serviceTableData.data = {}
            nextProps.tableData.data.forEach((rowInfo) => {
                serviceTableData.data[rowInfo.id] = {data: rowInfo, filtered: true}
            })
            let idList = Object.keys(serviceTableData.data).sort((a, b) => {
                return (parseInt(a) >= parseInt(b)) ? 1 : -1
            })
            idList.map((id) => {
                const rowDataInfo = serviceTableData.data[id]
                if (rowDataInfo.level === undefined) {
                    this.updateLevel(serviceTableData, rowDataInfo, 0)
                }
            })
            serviceTableData.entryPoints = nextProps.tableData.entryPoints
            if (serviceTableData.entryPoints === undefined) {
                serviceTableData.entryPoints = Object.keys(serviceTableData.data).map((rowId) => {
                    return rowId
                })
            }
            serviceTableData.entryPoints = serviceTableData.entryPoints.sort((a, b) => {
                return (parseInt(a) >= parseInt(b)) ? 1 : -1
            })
            newState.serviceTableData = serviceTableData
        }

        nextProps.tableData.columns.map((columnInfo) => {
            newState.columnFilter[columnInfo.field] = {
                isFilterActive: false,
                columnId: columnInfo.field,
                filteredValues: [],
                filteredRows: []
            }
            newState.columnVisibility.data[columnInfo.field] = {isHidden: false}
        })

        // newState.serviceInfo.filteredRowIdList = Object.keys(nextProps.tableData.data).map((rowId) => {
        //     return nextProps.tableData.data[rowId].id
        // })
        this.setState(newState)
    }

    updateLevel(serviceTableData, rowDataInfo, level) {
        rowDataInfo.level = level
        const rowData = rowDataInfo.data
        if (rowData.childList !== undefined) {
            rowData.childList.map((childRowId) => {
                const childRowDataInfo = serviceTableData.data[childRowId]
                if (childRowDataInfo.level === undefined) {
                    this.updateLevel(serviceTableData.data, childRowDataInfo, level + 1)
                }
            })
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

    triggerRow = (rowId) => {
        if (this.state.serviceTableData.data[rowId].collapsed) {
            this.state.serviceTableData.data[rowId].collapsed = undefined
        } else {
            this.state.serviceTableData.data[rowId].collapsed = true
        }
    }

    toggleFilter = (x, y, columnId) => {
        let newState = {...this.state, ...{}}

        this.state.serviceTableData.columns.map((columnInfo) => {
            this.closeColumnFilter(columnInfo.field)
        })

        const offset = 1920 - 300
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
        let newState = {...this.state, ...{}}
        let columnFilter = newState.columnFilter[colId]
        if (columnFilter.filteredValues.includes(value)) {
            const index = columnFilter.filteredValues.indexOf(value)
            columnFilter.filteredValues.splice(index, 1)
        } else {
            columnFilter.filteredValues.push(value)
        }

        let currentFilteredIdList = Object.keys(this.state.serviceTableData.data).map((rowId) => {
            this.state.serviceTableData.data[rowId].filtered = false
            return rowId
        })
        console.log(currentFilteredIdList)
        Object.keys(this.state.columnFilter).map((columnId) => {
            let columnFilteredRowIdList = []
            // var columnId = "total_quantity"
            const columnFilter = this.state.columnFilter[columnId]
            const rowValues = this.getRowValues(columnId)
            columnFilter.filteredValues.map((value) => {
                rowValues[value].rowIdList.map((rowId) => {
                    columnFilteredRowIdList.push(rowId)
                })
            })
            let bufferFilteredIdList = []
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

        currentFilteredIdList.map((rowId) => {
            newState.serviceTableData.data[rowId].filtered = true
        })

        // newState.serviceInfo.filteredRowIdList = currentFilteredIdList
        console.log(newState.serviceTableData.data)

        this.setState(newState)
    }

    getRowValues = (columnId) => {
        let rowValues = []
        Object.keys(this.state.serviceTableData.data).map((rowId) => {
            const rowDataInfo = this.state.serviceTableData.data[rowId]
            const rowInfo = rowDataInfo.data
            const cellInfo = rowInfo[columnId]

            if (cellInfo !== undefined) {
                let cellValues = []
                if (cellInfo.filterFunc === undefined) {
                    cellValues = [{value: cellInfo.value, renderedValue: cellInfo.value}]
                } else {
                    cellValues = cellInfo.filterFunc(this.state.serviceTableData.tableData, rowId, columnId)
                }
                cellValues.map((cellValue) => {
                    cellValue.rowId = rowId
                })
                rowValues = rowValues.concat(cellValues)
            }
        })

        let filteredValues = {}
        rowValues.map(rowValue => {
            if (filteredValues[rowValue.value] === undefined) {
                filteredValues[rowValue.value] = {renderedValue: rowValue.renderedValue, rowIdList: [rowValue.rowId]}
            } else {
                filteredValues[rowValue.value].rowIdList.push(rowValue.rowId)
            }
        })
        return filteredValues
    }

    onClickInTable = (e) => {
        this.closeAllColumnFilters()
    }

    closeAllColumnFilters = () => {
        this.state.serviceTableData.columns.map((columnInfo) => {
            this.closeColumnFilter(columnInfo.field)
        })
    }

    closeColumnFilter = (columnId) => {
        let newState = {...this.state, ...{}}
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
        if (this.state.serviceTableData.data !== undefined) {
            const tbody = this.state.serviceTableData.entryPoints.map((id) => {
                const rowDataInfo = this.state.serviceTableData.data[id]
                return (
                    <Row
                        key={rowDataInfo.data.id}
                        rowDataInfo={rowDataInfo}
                        serviceTableData={this.state.serviceTableData}
                        triggerRow={this.triggerRow}
                        columnVisibility={this.state.columnVisibility}
                    />
                )
            })

            const columnFilters = Object.keys(this.state.columnFilter).map((colId) => {
                return (
                    <ColumnFilter
                        key={colId}
                        tableData={this.state.serviceTableData}
                        columnFilter={this.state.columnFilter[colId]}
                        closeColumnFilter={this.closeColumnFilter}
                        toggleFilterRow={this.toggleFilterRow}
                        getRowValues={this.getRowValues}
                    />)
            })

            const columnVisibilityContainer = <ColumnVisibility tableData={this.state.serviceTableData} columnVisibility={this.state.columnVisibility} hideColumnVisibility={this.hideColumnVisibility} />

            return (
                <div className={styles.tableContainer} onClick={(e) => { this.onClickInTable(e) }}>
                    {columnFilters}
                    {columnVisibilityContainer}
                    <MenuBar tableData={this.state.serviceTableData} toogleColumnVisibilityContainer={this.toogleColumnVisibilityContainer} />
                    <table style={getStyle(this.state.serviceTableData.tableData.style, this.props)}>
                        <HeaderRow
                            serviceTableData={this.state.serviceTableData}
                            toggleFilter={this.toggleFilter}
                            columnFilter={this.state.columnFilter}
                            columnVisibility={this.state.columnVisibility}
                        />
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
