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

export const getClass = (cellClassFunc, props) => {
    if (cellClassFunc !== undefined) {
        if (cellClassFunc instanceof Function) {
            return cellClassFunc(props)
        } else if (typeof cellClassFunc === 'string') {
            return cellClassFunc
        }
    }
    return ''
}

export const renderHeaderCell = (renderFunc, tableData, headerInfo) => {
    if (renderFunc) {
        return renderFunc(tableData.tableData, headerInfo)
    }
    return headerInfo.title
}

export const renderCell = (renderFunc, tableData, rowData, columnId) => {
    const cellInfo = rowData[columnId]
    if (renderFunc) {
        return renderFunc(tableData.tableData, rowData, columnId)
    }
    return cellInfo.value
}
