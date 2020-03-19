export const getStyle = (styleFunc, props) => {
    if (styleFunc) {
        return styleFunc(props)
    }
    return {
    }
}

export const getCellStyle = (defaultStyleFunc, cellStyleFunc, props) => {
    if (cellStyleFunc !== undefined) {
        return cellStyleFunc(props)
    } else if (defaultStyleFunc !== undefined) {
        return defaultStyleFunc(props)
    } else {
        return {
        }
    }
}

export const renderHeaderCell = (renderFunc, tableData, headerInfo) => {
    if (renderFunc) {
        return renderFunc(tableData.sourceTableData, headerInfo)
    }
    return headerInfo.title
}

export const renderCell = (renderFunc, tableData, rowDataId, columnId) => {
    var rowData = tableData.data[rowDataId]
    var cellInfo = rowData[columnId]
    if (renderFunc) {
        return renderFunc(tableData.sourceTableData, rowDataId, columnId)
    }
    return cellInfo.value
}
