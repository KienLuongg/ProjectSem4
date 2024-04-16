import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select, Input } from 'antd';
import axios from 'axios';

interface SchoolYearClassData {
    id: number;
    gradeId: string;
    schoolYearId: string;
    teacherSchoolYearId: string;
    roomId: string;
    className: string;
    classCode: string;
}

export default function SchoolYearClass() {
    const [schoolYearClass, setSchoolYearClass] = useState<SchoolYearClassData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://14.248.97.203:4869/api/v1/school/school-year-class')
            .then(response => {
                setSchoolYearClass(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const formData = await form.validateFields(['teacherId', 'schoolYearId']);
            const res = await axios.post('http://14.248.97.203:4869/api/v1/school/creat-school-year-class', formData);
            console.log('Data submitted:', res.data);
            setIsModalOpen(false);
            fetchData();
            message.success('Data submitted successfully!');
        } catch (error: any) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('Network Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            message.error('Failed to submit data. Please try again later.');
        }
    };

    return (
        <div>
            <Row justify="space-between" style={{ marginBottom: '15px' }}>
                <Col>
                    <Button type="default" onClick={showModal}>
                        Thêm
                    </Button>
                </Col>
                <Col>
                    <Modal
                        title="Thêm lớp"
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleSubmit}>
                                Gửi
                            </Button>,
                        ]}
                    >
                        <Form
                            form={form}
                            name="addSchoolYearTeacherForm"
                            labelCol={{ flex: '110px' }}
                            labelAlign="left"
                            labelWrap
                            wrapperCol={{ flex: 1 }}
                            colon={false}
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item
                                label="Tên lớp"
                                name="className"
                                rules={[{ required: true, message: 'Vui lòng chọn giáo viên!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mã lớp"
                                name="classCode"
                                rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Adjusted labels for the following form items */}
                            <Form.Item
                                label="Khối học"
                                name="gradeId"
                                rules={[{ required: true, message: 'Vui lòng chọn khối học!' }]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Phòng học"
                                name="roomId"
                                rules={[{ required: true, message: 'Vui lòng chọn phòng học!' }]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Giáo viên"
                                name="teacherSchoolYearId"
                                rules={[{ required: true, message: 'Vui lòng chọn giáo viên!' }]}
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="Năm học"
                                name="schoolYearId"
                                rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
                            >
                                <Select />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={schoolYearClass} rowKey="id">
                <Table.Column title="ID" dataIndex="id" />
                <Table.Column title="Tên lớp" dataIndex="className" />
                <Table.Column title="Mã lớp" dataIndex="classCode" />
                <Table.Column title="Khối học" dataIndex="gradeId" />
                <Table.Column title="Phòng học" dataIndex="roomId" />
                <Table.Column title="Giáo viên" dataIndex="teacherSchoolYearId" />
                <Table.Column title="Năm học" dataIndex="schoolYearId" />
            </Table>
        </div>
    );
}
