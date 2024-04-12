import { Button, Col, Form, Input, Row, Select, Table, Modal, DatePicker, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';

const options = [
    { value: '1A1', label: '1A1' },
    { value: '1A2', label: '1A2' },
    { value: '1A3', label: '1A3' },
];

interface TeacherData {
    id: string;
    officerNumber: string;
    firstname: string;
    lastname: string;
    gender: string;
    address: string;
    phone: string;
    birthday: string;
    joiningDate: string;
    department: string;
    positionId: string;
    active: string;
}

export default function Teachers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [teachers, setTeachers] = useState<TeacherData[]>([]);


    useEffect(() => {
        // Fetch data for the table on component mount
        axios.get('http://14.248.97.203:4869/api/v1/school/teacher-school-year')
            .then(response => {
                // Update state with fetched data
                setTeachers(response.data);
                console.log("Fetched teachers:", response.data); // Log fetched students
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, []);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData: any) => {
        // Make POST request to submit form data
        axios.post('http://14.248.97.203:4869/api/v1/teacher/add-teacher', formData)
            .then(response => {
                // Handle successful submission
                console.log('Data submitted:', response.data);
                // Close modal
                setIsModalOpen(false);
                // Optionally, you can fetch updated data for the table here
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div>
            <Breadcrumb pageName='Classes' />
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
                            <Button type="primary">Nhập</Button>
                            <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
                                Thêm
                            </Button>
                            <Modal
                                title="Thêm giáo viên"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleSubmit}>
                                        Submit
                                    </Button>,
                                ]}
                                style={{ minWidth: 800 }}
                            >
                                <div>
                                    <Form
                                        name="wrap"
                                        labelCol={{ flex: '90px' }}
                                        labelAlign="left"
                                        labelWrap
                                        wrapperCol={{ flex: 1 }}
                                        colon={false}
                                        style={{ maxWidth: 650 }}
                                    >
                                        <Row gutter={[16, 0]}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Họ:"
                                                    name="lastname"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>


                                            <Col span={12}>
                                                <Form.Item
                                                    label="Tên:"
                                                    name="firstname"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Ngày sinh:"
                                                    name="Dob"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <DatePicker />
                                                </Form.Item></Col>

                                            <Col span={12}>
                                                <Form.Item
                                                    label="Giới tính:"
                                                    name="gender"
                                                    rules={[{ required: true, message: 'Please select!' }]}
                                                >
                                                    <Radio.Group>
                                                        <Radio value="male">Nam</Radio>
                                                        <Radio value="female">Nữ</Radio>
                                                    </Radio.Group>
                                                </Form.Item></Col>

                                        </Row>

                                        <Row gutter={[16, 0]}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Số CCCD:"
                                                    name="citizen-id"
                                                    rules={[
                                                        { required: true, message: 'Please input!' },
                                                        { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Số điện thoại:"
                                                    name="phone"
                                                    rules={[
                                                        { required: true, message: 'Please input!' },
                                                        { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Địa chỉ:"
                                                    name="address"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Email:"
                                                    name="email"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                        </Row>

                                        <Row gutter={[16, 0]}>

                                            <Col span={12}>
                                                <Form.Item
                                                    label="Quốc tịch:"
                                                    name="nation"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Số hiệu cán bộ:"
                                                    name="officerNumber"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Input />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Dạy môn:"
                                                    name="positionId"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Ngày bắt đầu:"
                                                    name="joiningDate"
                                                    rules={[{ required: true, message: 'Please input!' }]}
                                                >
                                                    <DatePicker />
                                                </Form.Item></Col>

                                        </Row>

                                        <Form.Item
                                            label="Ảnh đại diện:"
                                            name="avatar"
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) => e.fileList}
                                        >
                                            <Upload name="avatar" listType="picture">
                                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
            <Table dataSource={teachers} rowKey="id">
                <Table.Column title="Số hiệu" dataIndex="officerNumber" />
                <Table.Column
                    title="Họ và tên"
                    render={(text, record: TeacherData) =>
                        `${record.firstname} ${record.lastname}`
                    }
                />
                <Table.Column title="Ngày sinh" dataIndex="birthday" />
                <Table.Column title="Giới tính" dataIndex="gender" />
                <Table.Column title="Địa chỉ" dataIndex="address" />
                <Table.Column title="Trạng thái" dataIndex="status" />
                <Table.Column title="Vị trí" dataIndex="positionId" />
                <Table.Column title="Ngày gia nhập" dataIndex="joiningDate" />
            </Table>
        </div>
    );
}
