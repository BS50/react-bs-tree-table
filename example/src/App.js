import React, { Component } from 'react'

// import ExampleComponent from 'react-bs-tree-table'
// import ExampleComponent from 'react-bs-tree-table'
import {ExampleComponent1, ExampleComponent, Table} from 'react-bs-tree-table'
import {renderYearCell, yearFilterFunc} from './TableRenderers'
import {firstColumnStyle, defaultCellStyle} from './TableStyles'

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
            defaultCellStyle: defaultCellStyle,
            entryPoints: [
                0, 1
            ],
            filterActive: true,
            columnVisibility: true
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

    getTestData() {
        return {
            'columns': [
                    {'field':'isummary','title':'Название'},
                    {'field':'desired_quantity','title':'Жел.Кол-во'},
                    {'field':'unit','title':'Ед.изм.'},
                    {'field':'ez_vendorcode','title':'Внутренний артикул'},
                    {'field':'object','title':'Объект'},
                    {'field':'warehouse','title':'Склад'}
                ],
            'data':[
                {
                    'id':2,
                    'isummary':{'value':'Взаимодействие с пресс-службой Роснано в рамках пресс-тура журналистов и блогеров (подготовка справки о компании, взаимодействие с корреспондентами информагентств, мониторинг СМИ)'},
                    'quantity':{'value':30},'warehouse':{'value':'Инженерная'},
                    'unit':{'value':'ч'},
                    'ez_vendorcode':{'value':'MKG72297'},
                    'owner':{'value':'malyarevich'},
                    'desired_quantity':{'value':1},
                    'level':0
                },
                {
                    'id':3,
                    'isummary':{'value':'Взаимодействие с корреспондентом портала «Хайтек» по подготовке лонгрида о компании'},
                    'quantity':{'value':15},
                    'warehouse':{'value':'Инженерная'},
                    'unit':{'value':'ч'},
                    'ez_vendorcode':{'value':'PIP74810'},
                    'owner':{'value':'malyarevich'},
                    'desired_quantity':{'value':12},
                    'level':0
                }
            ]
        }
    }

    render () {
        // var tableData = this.getTreeData()
        var tableData = this.getTreeData()

        return (

            <div>
                <div style={{backgroundColor: '#ebb867', }}>dDSF</div>
                <Table tableData={tableData} />
            </div>
        )
    }
}
