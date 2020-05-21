import React from 'react'

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

export const renderHeaderCell = (Renderer, funcRenderer, tableData, headerInfo) => {
    if (Renderer) {
        return <Renderer tableData={tableData.tableData} headerInfo={headerInfo} />
    } else if (funcRenderer) {
        return funcRenderer(tableData.tableData, headerInfo)
    }
    return headerInfo.title
}

export const renderCell = (Renderer, funcRenderer, tableData, rowData, columnId) => {
    const cellInfo = rowData[columnId]
    if (Renderer) {
        return <Renderer tableData={tableData.tableData} rowData={rowData} columnId={columnId} />
    } else if (funcRenderer) {
        return funcRenderer(tableData.tableData, rowData, columnId)
    }
    return cellInfo.value
}
