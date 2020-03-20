import React, {Component} from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'

class ColumnVisibility extends Component {
    getStyle = (left, top) => {
        return {
            left: left,
            top: top,
            display: 'inline',
            position: 'fixed',
            zIndex: '12000',
            borderRadius: '5px',
            backgroundColor: 'lightgrey',
            padding: '3px'
        }
    }

    handleClickOutside() {
        this.props.hideColumnVisibility()
    }

    render() {
        if (this.props.columnVisibility.isActive) {
            const values = this.props.tableData.columns.map((columnInfo) => {
                const isHidden = this.props.columnVisibility.data[columnInfo.field].isHidden
                return <React.Fragment key={columnInfo.field}>
                    <input
                        type='checkbox'
                        checked={!isHidden}
                        value={!isHidden}
                        onChange={() => { this.props.columnVisibility.data[columnInfo.field].isHidden = !isHidden }}
                    />
                    {columnInfo.title}
                    <br />
                </React.Fragment>
            })
            return (
                <div style={this.getStyle(this.props.columnVisibility.mouseX.toString() + 'px', this.props.columnVisibility.mouseY.toString() + 'px')}>
                    {values}
                </div>
            )
        } else {
            return <React.Fragment />
        }
    }
}

ColumnVisibility.propTypes = {
    tableData: PropTypes.object.isRequired,
    columnVisibility: PropTypes.object.isRequired,
    hideColumnVisibility: PropTypes.func.isRequired
}

export default onClickOutside(ColumnVisibility)
