import React, {Component} from 'react'
import PropTypes from 'prop-types'

import HeaderCell from './HeaderCell'

class HeaderRow extends Component {
    componentDidMount() {
    }

    toggleFilter = (x, y, columnId) => {
        this.props.toggleFilter(x, y, columnId)
    }

    render() {
        const columns = this.props.serviceTableData.columns
        if (columns !== undefined) {
            const headers = columns.map((columnInfo) => {
                const columnVisibilityData = this.props.columnVisibility.data[columnInfo.field]
                if (columnVisibilityData !== undefined && !columnVisibilityData.isHidden) {
                    return <HeaderCell
                        key={columnInfo.field}
                        serviceTableData={this.props.serviceTableData}
                        toggleFilter={this.toggleFilter}
                        columnInfo={columnInfo}
                        columnFilter={this.props.columnFilter[columnInfo.field]}
                    />
                } else {
                    return <React.Fragment key={columnInfo.field}></React.Fragment>
                }
            });
            return (
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
            )
        }

        return <React.Fragment />
    }
}

HeaderRow.propTypes = {
    serviceTableData: PropTypes.object.isRequired,
    columnVisibility: PropTypes.object.isRequired,
    columnFilter: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired
}

export default HeaderRow
