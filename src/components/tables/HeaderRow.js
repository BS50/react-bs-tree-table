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
            var headers = columns.map((headerInfo) => {
                var isColumnHidden = headerInfo.columnHidden
                if (isColumnHidden) {
                    return <React.Fragment key={headerInfo.field}></React.Fragment>
                }
                return <HeaderCell
                    key={headerInfo.field}
                    tableData={this.props.tableData}
                    toggleFilter={this.toggleFilter}
                    info={headerInfo}
                    columnFilter={this.props.columnFilter[headerInfo.field]}
                />
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
    columnFilter: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired
}

export default HeaderRow
