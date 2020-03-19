import React from 'react'

export const renderYearCell = (tableData, rowDataId, columnId) => {
    var rowData = tableData.data[rowDataId]
    var cellInfo = rowData[columnId]
    return <div>{cellInfo.value.year}-{cellInfo.value.month}-{cellInfo.value.day}</div>
}

export const yearFilterFunc = (tableData, rowDataId, columnId) => {
    var rowData = tableData.data[rowDataId]
    var cellInfo = rowData[columnId]
    return [{value: cellInfo.value.year, renderedValue: cellInfo.value.year}]
}
