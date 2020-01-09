export const getStyle = (styleFunc, props) => {
    if (styleFunc) {
        return styleFunc(props)
    }
    return {
    }
}

export const renderHeaderCell = (renderFunc, tableData, headerInfo) => {
    if (renderFunc) {
        return renderFunc(tableData, headerInfo)
    }
    return headerInfo.title
}

export const renderCell = (renderFunc, tableData, rowDataId, columnId) => {
    var rowData = tableData.data[rowDataId]
    var cellInfo = rowData[columnId]
    if (renderFunc) {
        return renderFunc(tableData, rowDataId, columnId)
    }
    return cellInfo.value
}
