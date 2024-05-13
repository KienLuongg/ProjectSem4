import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, RadioChangeEvent } from 'antd';
import { Breadcrumb, Button, Col, Input, Radio, Row, Select, Space, Table } from 'antd';
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

    const columns: ColumnsType<DataType> = [
        {
            title: 'Giáo viên',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Chủ nhiệm',
            dataIndex: 'assignment',
            key: '',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Phân công giảng dạy',
            dataIndex: 'assignment',
            key: '',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Tổng số tiết/tuần',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
    ];

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return <div>

        <Row>
            <Col span={6} >
                <Breadcrumb className="mb-10">
                    <Breadcrumb.Item className="text-3xl text-black-2">Thống kê</Breadcrumb.Item>
                </Breadcrumb>
                <Col span={24} className='mb-10'>
                    <Select
                        className='w-full'
                        showSearch
                        placeholder="Select"
                        optionFilterProp="children"
                        onSearch={onSearch}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    />
                </Col>
                <Col span={24} className='mb-10'>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Tất cả</Radio>
                            <Radio value={2}>Đã phân công</Radio>
                            <Radio value={3}>Chưa phân công</Radio>
                        </Space>
                    </Radio.Group>
                </Col>
                <Col span={24}>
                    <div className="mt-auto">
                        <NavLink to="/assignment" type="default" className="border-2 border-solid rounded-md mb-4 w-full bg-white-500 text-black p-2">
                            Thực hiện phân công
                        </NavLink>
                    </div>
                </Col>
            </Col>
            <Col span={1}></Col>
            <Col span={16}>
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} className="mb-4" />
                    </Col>
                </Row>

            </Col>
        </Row>
    </div>;
};

export default App;