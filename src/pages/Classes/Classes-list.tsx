import { Button, Col, Row, Select, Form, Input, Table, Modal, Radio, DatePicker } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';

const options = [
    { value: '1A1', label: '1A1' },
    { value: '1A2', label: '1A2' },
    { value: '1A3', label: '1A3' },
];

interface ClassData {
    id: string;
    classCode: string;
    name: string;
    room: string;
    teacher: string;
    grade: string;
}

const fakeData = [
    {
        key: '1',
        classCode: '10A1',
        name: 'Lớp 10A1',
        room: 'Phòng 101',
        teacher: 'Nguyễn Văn A',
        grade: '10',
    },
    {
        key: '2',
        classCode: '11B2',
        name: 'Lớp 11B2',
        room: 'Phòng 102',
        teacher: 'Trần Thị B',
        grade: '11',
    },
    // Add more fake data objects as needed
];



export default function Classes() {

    // Hàm để mở modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Breadcrumb pageName='Classes' />
            <Row style={{ marginBottom: '20px' }}>
                {/* Năm học */}
                <Col span={6}>
                    <Form.Item
                        label="Năm học"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                {/* Khối */}
                <Col span={6}>
                    <Form.Item
                        label="Khối"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                {/* Tìm kiếm theo tên */}
                <Col span={6}>
                    <Form.Item
                        label="Tên"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Input type="text" placeholder="Điền tên học sinh" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                {/* Tìm kiếm theo mã */}
                <Col span={6}>
                    <Form.Item
                        label="Mã học sinh"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Input type="text" placeholder="Điền mã học sinh" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

            </Row>
            <Row style={{ marginBottom: '15px' }}>

                <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item
                        label=" "
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px', paddingRight: '56px' }}
                    >
                        <div>
                            <Button type="primary">Tìm kiếm</Button>
                            <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
                                Thêm
                            </Button>
                            <Modal
                                title="Thêm học sinh"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <div>
                                    <Form
                                        name="wrap"
                                        labelCol={{ flex: '110px' }}
                                        labelAlign="left"
                                        labelWrap
                                        wrapperCol={{ flex: 1 }}
                                        colon={false}
                                        style={{ maxWidth: 600 }}
                                    >
                                        <Form.Item
                                            label="Họ:"
                                            name="lastname"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Tên:"
                                            name="firstname"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Ngày sinh:"
                                            name="Dob"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <DatePicker />
                                        </Form.Item>

                                        <Form.Item
                                            label="Giới tính:"
                                            name="gender"
                                            rules={[{ required: true, message: 'Please select!' }]}
                                        >
                                            <Radio.Group>
                                                <Radio value="male">Nam</Radio>
                                                <Radio value="female">Nữ</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item
                                            label="Địa chỉ:"
                                            name="address"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Form.Item
                                                label="Lớp:"
                                                name="class"
                                                rules={[{ required: true, message: 'Please input!' }]}
                                            >
                                                <Select />
                                            </Form.Item>

                                            <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                        </div>
                    </Form.Item>
                </Col>
            </Row>

        </div>
    );
}
