import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Select, Table, Modal, DatePicker, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
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
    fullName: {
        firstname: string;
        lastname: string;
    };
    gender: string;
    address: string;
    phone: string;
    birthday: string;
    joiningDate: string;
    department: string;
    positionId: string;
    active: string;
}



const renderSTT = (text: string, record: unknown, index: number) => <span>{index + 1}</span>;

export default function Teachers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [teachers, setTeachers] = useState<TeacherData[]>([]);


    useEffect(() => {
        // Fetch data for the table on component mount
        axios.get('http://14.248.97.203:4869/api/v1/teacher/teachers')
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
            <Row style={{ marginBottom: '20px' }}>
                <Col span={6}>
                    <Form.Item
                        label="Giới tính"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Chức vụ"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Dạy môn"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Phòng ban"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Trạng thái làm việc"
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
                        <Input type="text" placeholder="Điền tên giáo viên" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                {/* Tìm kiếm theo mã */}
                <Col span={6}>
                    <Form.Item
                        label="Số hiệu cán bộ"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Input type="text" placeholder="Điền số hiệu" style={{ width: '80%' }} />
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
            <Table
                dataSource={teachers}
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    maxHeight: 380,
                }}
                bordered
                size="middle"
                virtual
                scroll={{ y: 380 }}
            >
                <Column
                    title="STT"
                    render={(text, record, index) => index + 1}
                    width={50}
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Số hiệu cán bộ"
                    dataIndex="officerNumber"
                    width={120}
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Họ và tên"
                    dataIndex="fullName"
                    width={200}
                    align="center"
                    className="custom-column"
                // render={(text, record: TeacherData) => (
                //     <Link to={`/details/${record.id}`} style={{ color: 'blue' }}>{text}</Link>
                // )}
                />
                <Column
                    title="Giới tính"
                    dataIndex="gender"
                    width={90}
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Ngày sinh"
                    dataIndex="birthday"
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Số điện thoại"
                    dataIndex="phone"
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Địa chỉ"
                    dataIndex="address"
                    align="center"
                    className="custom-column"
                />
                <Column
                    title="Email"
                    dataIndex="email"
                    align="center"
                    className="custom-column"
                />
            </Table>

        </div>
    );
}
