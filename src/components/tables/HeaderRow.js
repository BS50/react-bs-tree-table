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
        var columns = this.props.tableData.columns
        if (columns !== undefined) {
            var headers = columns.map((columnInfo) => {
                var columnVisibilityData = this.props.columnVisibility.data[columnInfo.field]
                if (columnVisibilityData !== undefined && !columnVisibilityData.isHidden) {
                    return <HeaderCell
                        key={columnInfo.field}
                        tableData={this.props.tableData}
                        toggleFilter={this.toggleFilter}
                        info={columnInfo}
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
    tableData: PropTypes.object.isRequired,
    columnVisibility: PropTypes.object.isRequired,
    columnFilter: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired
}

export default HeaderRow
