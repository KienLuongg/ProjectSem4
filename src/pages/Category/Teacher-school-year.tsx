import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select } from 'antd';
import teacherApi from '../../apis/urlApi';
import { SchoolYearTeacherData, SchoolYearsData, TeacherData } from '../../types/response';
import mainAxios from '../../apis/main-axios';

export default function SchoolYearTeacher() {
    const [schoolYearTeachers, setSchoolYearTeachers] = useState<SchoolYearTeacherData[]>([]);
    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);

    useEffect(() => {
        fetchData();
        fetchSchoolYears();
        fetchTeachers();
    }, []);

    const fetchData = () => {
        teacherApi.getTeacherSchoolYear()
            .then(response => {
                setSchoolYearTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchSchoolYears = () => {
        teacherApi.getSchoolYear()
            .then(response => {
                setSchoolYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching school years:', error);
            });
    };

    const fetchTeachers = () => {
        mainAxios.get('/api/v1/teacher')
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
            const formData = await form.validateFields();
            const res = await teacherApi.postCreateTeacherSchoolYear(formData);
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
                                        <Select.Option key={schoolYear.id} value={schoolYear.id}>
                                            {schoolYear.id}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={schoolYearTeachers} rowKey="id" className=' text-black dark:text-white'>
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column
                    title="Giáo viên"
                    dataIndex="teacherId"
                    render={(teacherId: string) => {
                        const teacher = teachers.find(teacher => teacher.id === teacherId);
                        return teacher ? teacher.lastname : 'Unknown';
                    }}
                />
                <Table.Column
                    title="Năm học"
                    dataIndex="schoolYearId"
                    render={(schoolYearId: number) => {
                        const schoolYear = schoolYears.find(year => year.id === schoolYearId);
                        return schoolYear ? schoolYear.id : 'Unknown';
                    }}
                />
            </Table>
        </div>
    );
}
