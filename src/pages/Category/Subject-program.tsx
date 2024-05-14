import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select, Input } from 'antd';
import axios from 'axios';
import mainAxios from '../../apis/main-axios';
import teacherApi from '../../apis/urlApi';

interface ProgramData {
    id: number;
    schoolYearSubjectId: string;
    gradeId: string;
    number: number;
    sem: string;
}

// interface Grade {
//     id: string;
//     name: string;
// }

interface SchoolYearSubject {
    id: string;
    name: string;
}

export default function SchoolProgram() {
    const [schoolProgram, setSchoolProgram] = useState<ProgramData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // const [grades, setGrades] = useState<Grade[]>([]);
    const [schoolYearSubjects, setSchoolYearSubjects] = useState<SchoolYearSubject[]>([]);

    useEffect(() => {
        fetchData();
        // fetchGrades();
        fetchSchoolYearSubjects();
    }, []);

    const fetchData = () => {
        mainAxios.get('/api/v1/school/school-year-subject-grade').then(response => {
            setSchoolProgram(response.data);
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // const fetchGrades = () => {
    //     axios.get('API_ENDPOINT_FOR_GRADES')
    //         .then(response => {
    //             setGrades(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching grades:', error);
    //         });
    // };

    const fetchSchoolYearSubjects = () => {
        teacherApi.getSchoolYearSubject()
            .then(response => {
                setSchoolYearSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching school year subjects:', error);
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
            const res = await mainAxios.post('/api/v1/school/creat-school-year-subject-grade', formData);
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
        <div className='p-4 md:p-6 2xl:p-10'>
            <Row style={{ marginBottom: '15px' }}>
                <Col span={12}></Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="default" onClick={showModal} style={{ marginLeft: '' }}>
                        Thêm
                    </Button>
                    <Modal
                        title="Thêm chương trình học"
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
                            name="addSchoolProgramForm"
                            labelCol={{ flex: '110px' }}
                            labelAlign="left"
                            labelWrap
                            wrapperCol={{ flex: 1 }}
                            colon={false}
                            style={{ maxWidth: 600 }}
                        >
                            {/* <Form.Item
                                label="Khối"
                                name="gradeId"
                                rules={[{ required: true, message: 'Vui lòng chọn một khối!' }]}
                            >
                                <Select>
                                    {grades.map(grade => (
                                        <Select.Option key={grade.id} value={grade.id}>
                                            {grade.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                label="Danh sách môn"
                                name="schoolYearSubjectId"
                                rules={[{ required: true, message: 'Vui lòng chọn một năm học!' }]}
                            >
                                <Select>
                                    {schoolYearSubjects.map(subject => (
                                        <Select.Option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Số tiết"
                                name="number"
                                rules={[{ required: true, message: 'Vui lòng nhập số!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Học kỳ"
                                name="sem"
                                rules={[{ required: true, message: 'Vui lòng chọn học kỳ!' }]}
                            >
                                <Select>
                                    <Select.Option value="HOC_KI_1">Học kỳ 1</Select.Option>
                                    <Select.Option value="HOC_KI_2">Học kỳ 2</Select.Option>
                                    <Select.Option value="CA_NAM">Cả năm</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={schoolProgram} rowKey="id" className=' text-black dark:text-white'>
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column title="Môn học" dataIndex="schoolYearSubjectId" />
                {/* <Table.Column title="Khối" dataIndex="gradeId" /> */}
                <Table.Column title="Số tiết" dataIndex="number" />
            </Table>
        </div>
    );
}
