import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Breadcrumb, Button, Col, Input, Row, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { NavLink } from 'react-router-dom';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const App: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={`${selectedKeys[0] || ''}`}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Giáo viên',
            dataIndex: 'name',
            key: 'name',
            width: '200',

            ...getColumnSearchProps('name'),
        },
        {
            title: 'Chủ nhiệm',
            dataIndex: 'assignment',
            key: '',
            width: '200',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Phân công giảng dạy',
            dataIndex: 'assignment',
            key: '',
            width: '200',
            ...getColumnSearchProps('age'),
        },

    ];

    const column1: any = [
        {
            title: 'Lớp',
            dataIndex: '',
            key: '',
            width: '20px',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value: string, record: { address: string | string[]; }) => record.address.indexOf(value as string) === 0,
        },
    ];

    const column2: any = [
        {
            title: ''
        },
        {
            title: 'Môn học',
            dataIndex: '',
            key: '',
            width: '95%',
        },
    ];

    return <div className='p-4 md:p-6 2xl:p-1'>
        <Breadcrumb className="mb-4">
            <Breadcrumb.Item className="text-3xl text-black">Phân công giảng dạy</Breadcrumb.Item>
        </Breadcrumb>
        <Row className='flex justify-end mb-4 pr-5'>
            <NavLink to="/assignment-list" className='border-2 border-solid rounded-md mr-3 px-4'>Quay lại</NavLink>
            <Button className='px-8 bg-blue text-white'>Lưu</Button>
        </Row>
        <Row>
            <Col span={10} className='mr-4 w-1/2'>
                <Table columns={columns} className="mb-4" />
            </Col>
            <Col span={4} className='mr-4 w-1/4'>
                <Table columns={column1} className='mb-4' />
            </Col>
            <Col span={9} className='w-1/4'>
                <Table columns={column2} className='mb-4' rowSelection={rowSelection} />
            </Col>
        </Row>
    </div>;
};
export default App;