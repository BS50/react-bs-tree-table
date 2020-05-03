import React, { Component } from 'react'

// import ExampleComponent from 'react-bs-tree-table'
// import ExampleComponent from 'react-bs-tree-table'
import {ExampleComponent1, ExampleComponent, Table} from 'react-bs-tree-table'
import {renderYearCell, yearFilterFunc} from './TableRenderers'
import {firstColumnStyle, defaultCellStyle, exampleClass, defaultColumnClass, nameColumnClass} from './TableStyles'
import { v4 as uuidv4 } from 'uuid'

export default class App extends Component {
    getTreeData() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true,
                    class: 'name-column-class'
                },
                {
                    field: 'secondname',
                    title: 'Имя',
                    class: defaultColumnClass
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения',
                    class: 'default-column-class'
                }
            ],
            data: [
                {
                    'id': 'xxx-0',
                    'firstname': {
                        value: 'Иванов',
                        style: firstColumnStyle
                    },
                    'secondname': {
                        value: 'Сергей'
                    },
                    'birthday': {
                        value: '12.04.1956',
                        class: exampleClass
                    }
                },
                {
                    'id': 'yyy-1',
                    'firstname': {
                        value: 'Петров'
                    },
                    'secondname': {
                        value: 'Игорь'
                    },
                    'childList': ['2', '3']
                },
                {
                    'id': '2',
                    'firstname': {
                        value: 'Пушкин'
                    },
                    'secondname': {
                        value: 'Савелий'
                    }
                },
                {
                    'id': '3',
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
            class: 'table-class',
            defaultCellStyle: defaultCellStyle,
            entryPoints: [
                'xxx-0', 'yyy-1'
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
                    'id': uuidv4(),
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
                    'id': uuidv4(),
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
                    'id': uuidv4(),
                    'firstname': {
                        value: 'Пушкин'
                    },
                    'secondname': {
                        value: 'Савелий'
                    }
                },
                {
                    'id': uuidv4(),
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
                {'field': 'isummary', 'title': 'Название'},
                {'field': 'desired_quantity', 'title': 'Жел.Кол-во'},
                {'field': 'unit', 'title': 'Ед.изм.'},
                {'field': 'ez_vendorcode', 'title': 'Внутренний артикул'},
                {'field': 'object', 'title': 'Объект'},
                {'field': 'warehouse', 'title': 'Склад'}
            ],
            'data': [
                {
                    'id': 2,
                    'isummary': {'value': 'Взаимодействие с пресс-службой Роснано в рамках пресс-тура журналистов и блогеров (подготовка справки о компании, взаимодействие с корреспондентами информагентств, мониторинг СМИ)'},
                    'quantity': {'value': 30}, 'warehouse': {'value': 'Инженерная'},
                    'unit': {'value': 'ч'},
                    'ez_vendorcode': {'value': 'MKG72297'},
                    'owner': {'value': 'malyarevich'},
                    'desired_quantity': {'value': 1},
                    'level': 0
                },
                {
                    'id': 3,
                    'isummary': {'value': 'Взаимодействие с корреспондентом портала «Хайтек» по подготовке лонгрида о компании'},
                    'quantity': {'value': 15},
                    'warehouse': {'value': 'Инженерная'},
                    'unit': {'value': 'ч'},
                    'ez_vendorcode': {'value': 'PIP74810'},
                    'owner': {'value': 'malyarevich'},
                    'desired_quantity': {'value': 12},
                    'level': 0
                }
            ]
        }

    }

    getKZData() {
        return {"columns":[{"field":"name","title":"Название","grouped":true},{"field":"address","title":"Адрес"},{"field":"weight","title":"вес"}],"data":[{"id":"d853b87870b911ea91bf7c2a31786c3e","pk":5,"name":{"value":"Склад №1"},"address":{"value":"Красный Яр"},"childList":["d854644470b911ea91bf7c2a31786c3e","d856b42470b911ea91bf7c2a31786c3e"]},{"id":"d854644470b911ea91bf7c2a31786c3e","pk":7,"name":{"value":"Отсек №2"},"product_list":{},"childList":["d855b38a70b911ea91bf7c2a31786c3e","d855b4d470b911ea91bf7c2a31786c3e","d855b5a670b911ea91bf7c2a31786c3e"]},{"id":"d855b38a70b911ea91bf7c2a31786c3e","name":{"value":"Картофель-Коломбо"},"variety":"Коломбо","recepted_weight":800,"weight":{"value":550},"writen_off_weight":250},{"id":"d855b4d470b911ea91bf7c2a31786c3e","name":{"value":"Картофель-Гала"},"variety":"Гала","recepted_weight":300,"weight":{"value":100},"writen_off_weight":200},{"id":"d855b5a670b911ea91bf7c2a31786c3e","name":{"value":"Морковь-Победа"},"variety":"Победа","recepted_weight":400,"weight":{"value":400}},{"id":"d856b42470b911ea91bf7c2a31786c3e","pk":6,"name":{"value":"Отсек №1"},"product_list":{},"childList":[]},{"id":"d867b01270b911ea91bf7c2a31786c3e","pk":6,"name":{"value":"Склад №2"},"address":{"value":"Красный Яр"},"childList":["d8684c2070b911ea91bf7c2a31786c3e"]},{"id":"d8684c2070b911ea91bf7c2a31786c3e","pk":8,"name":{"value":"Отсек №1"},"product_list":{},"childList":["d869678670b911ea91bf7c2a31786c3e"]},{"id":"d869678670b911ea91bf7c2a31786c3e","name":{"value":"Морковь-Победа"},"variety":"Победа","recepted_weight":200,"weight":{"value":200}},{"id":"d86a220270b911ea91bf7c2a31786c3e","pk":7,"name":{"value":"Склад №3"},"address":{"value":"Садовое"},"childList":["d86ae55270b911ea91bf7c2a31786c3e","d86e2d6670b911ea91bf7c2a31786c3e","d8725ada70b911ea91bf7c2a31786c3e"]},{"id":"d86ae55270b911ea91bf7c2a31786c3e","pk":11,"name":{"value":"Отсек №3"},"product_list":{},"childList":[]},{"id":"d86e2d6670b911ea91bf7c2a31786c3e","pk":10,"name":{"value":"Отсек №2"},"product_list":{},"childList":[]},{"id":"d8725ada70b911ea91bf7c2a31786c3e","pk":9,"name":{"value":"Отсек №1"},"product_list":{},"childList":[]}],"entryPoints":["d853b87870b911ea91bf7c2a31786c3e","d867b01270b911ea91bf7c2a31786c3e","d86a220270b911ea91bf7c2a31786c3e"]}
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
