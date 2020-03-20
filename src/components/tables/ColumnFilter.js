import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles.css'

class ColumnFilter extends Component {
    componentDidMount() {
    }

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

    getColumnFilterListStyle = () => {
        return {
            maxHeight: '500px',
            overflow: 'auto'
        }
    }

    onFilterClick = (e) => {
        e.stopPropagation()
    }

    render() {
        if (this.props.columnFilter.isFilterActive) {
            const valueRenderedValueMap = this.props.getRowValues(this.props.columnFilter.columnId)
            const values = Object.keys(valueRenderedValueMap).map((value) => {
                const renderedValue = valueRenderedValueMap[value].renderedValue
                const isChoosen = this.props.columnFilter.filteredValues.includes(value)
                return (
                    <div key={value}>
                        <input
                            type='checkbox'
                            checked={isChoosen}
                            value={isChoosen}
                            onChange={() => { this.props.toggleFilterRow(this.props.columnFilter.columnId, value) }}
                        />
                        {renderedValue}
                    </div>
                )
            })
            return <div onClick={(e) => { this.onFilterClick(e) }} style={this.getStyle(this.props.columnFilter.mouseX.toString() + 'px', this.props.columnFilter.mouseY.toString() + 'px')} id='columnFilter'>
                <div style={this.getColumnFilterListStyle()}>
                    {values}
                </div>
                <button className={styles.transparentButton} onClick={() => { this.props.closeColumnFilter(this.props.columnFilter.columnId) }}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        } else {
            return <React.Fragment />
        }
    }
}

ColumnFilter.propTypes = {
    columnFilter: PropTypes.object.isRequired,
    getRowValues: PropTypes.func.isRequired,
    toggleFilterRow: PropTypes.func.isRequired,
    closeColumnFilter: PropTypes.func.isRequired
}

export default ColumnFilter
