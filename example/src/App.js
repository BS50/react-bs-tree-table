import React, { Component } from 'react'

// import ExampleComponent from 'react-bs-tree-table'
// import ExampleComponent from 'react-bs-tree-table'
import {ExampleComponent1, ExampleComponent, Table} from 'react-bs-tree-table'
import {renderYearCell, yearFilterFunc} from './TableRenderers'
import {firstColumnStyle} from './TableStyles'

export default class App extends Component {
    getTreeData() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true
                },
                {
                    field: 'secondname',
                    title: 'Имя'
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения'
                }
            ],
            data: [
                {
                    'id': 0,
                    'firstname': {
                        value: 'Иванов',
                        style: firstColumnStyle
                    },
                    'secondname': {
                        value: 'Сергей'
                    },
                    'birthday': {
                        value: '12.04.1956'
                    }
                },
                {
                    'id': 1,
                    'firstname': {
                        value: 'Петров'
                    },
                    'secondname': {
                        value: 'Игорь'
                    },
                    'childList': [2, 3]
                },
                {
                    'id': 2,
                    'firstname': {
                        value: 'Пушкин'
                    },
                    'secondname': {
                        value: 'Савелий'
                    }
                },
                {
                    'id': 3,
                    'firstname': {
                        value: 'Барышев'
                    },
                    'secondname': {
                        value: 'Михаил'
                    },
                    'birthday': {
                        value: '03.09.1971'
                    }
                }
            ],
            entryPoints: [
                0, 1
            ],
            filterActive: true
        }
    }
    getSimpleData() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true
                },
                {
                    field: 'secondname',
                    title: 'Имя'
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения'
                }
            ],
            data: [
                {
                    'id': 0,
                    'firstname': {
                        value: 'Иванов'
                    },
                    'secondname': {
                        value: 'Сергей'
                    },
                    'birthday': {
                        value: {
                            day: '12',
                            month: '04',
                            year: '1956'
                        },
                        render: renderYearCell,
                        filterFunc: yearFilterFunc
                    }
                },
                {
                    'id': 1,
                    'firstname': {
                        value: 'Петров'
                    },
                    'secondname': {
                        value: 'Игорь'
                    },
                    'birthday': {
                        value: {
                            day: '24',
                            month: '09',
                            year: '1956'
                        },
                        render: renderYearCell,
                        filterFunc: yearFilterFunc
                    }
                },
                {
                    'id': 2,
                    'firstname': {
                        value: 'Пушкин'
                    },
                    'secondname': {
                        value: 'Савелий'
                    }
                },
                {
                    'id': 3,
                    'firstname': {
                        value: 'Барышев'
                    },
                    'secondname': {
                        value: 'Михаил'
                    },
                    'birthday': {
                        value: {
                            day: '03',
                            month: '09',
                            year: '1971'
                        },
                        render: renderYearCell,
                        filterFunc: yearFilterFunc
                    }
                }
            ],
            filterActive: true
        }
    }

    render () {
        var tableData = this.getTreeData()
        // var tableData = this.getSimpleData()

        return (
            <div>
                <Table tableData={tableData} />
            </div>
        )
    }
}
