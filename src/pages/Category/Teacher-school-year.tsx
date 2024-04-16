import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select } from 'antd';
import axios from 'axios';

interface SchoolYearTeacherData {
    id: number;
    teacherId: string;
    schoolYearId: string;
}

interface SchoolYear {
    id: string;
    name: string;
}

interface Teacher {
    id: string;
    lastname: string;
}

export default function SchoolYearTeacher() {
    const [schoolYearTeachers, setSchoolYearTeachers] = useState<SchoolYearTeacherData[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

    useEffect(() => {
        fetchData();
        fetchSchoolYears();
        fetchTeachers();
    }, []);

    const fetchData = () => {
        axios.get('http://14.248.97.203:4869/api/v1/school/teacher-school-year')
            .then(response => {
                setSchoolYearTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchSchoolYears = () => {
        axios.get('http://14.248.97.203:4869/api/v1/school/school-year')
            .then(response => {
                setSchoolYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching school years:', error);
            });
    };

    const fetchTeachers = () => {
        axios.get('http://14.248.97.203:4869/api/v1/school/teacher')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
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
            const res = await axios.post('http://14.248.97.203:4869/api/v1/school/creat-teacher-school-year', formData);
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
            <Row style={{ marginBottom: '15px' }}>
                <Col span={12}></Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="default" onClick={showModal} style={{ marginLeft: '' }}>
                        Thêm
                    </Button>
                    <Modal
                        title="Thêm năm học"
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleSubmit}>
                                Submit
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
                                label="Giáo viên"
                                name="teacherId"
                                rules={[{ required: true, message: 'Please select a teacher!' }]}
                            >
                                <Select>
                                    {teachers.map(teacher => (
                                        <Select.Option key={teacher.id} value={teacher.id}>
                                            {teacher.lastname}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Năm học"
                                name="schoolYearId"
                                rules={[{ required: true, message: 'Please select a school year!' }]}
                            >
                                <Select>
                                    {schoolYears.map(schoolYear => (
                                        <Select.Option key={schoolYear.id} value={schoolYear.id.toString()}>
                                            {schoolYear.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={schoolYearTeachers} rowKey="id">
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column title="Giáo viên" dataIndex="teacherId"
                    render={(teacherId: string) => {
                        const teacher = teachers.find(teacher => teacher.id === teacherId);
                        return teacher ? teacher.lastname : 'Unknown';
                    }} />
                <Table.Column title="Năm học" dataIndex="schoolYearId" />
            </Table>
        </div>
    );
}
