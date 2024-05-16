import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select, Input } from 'antd';
import axios from 'axios';
import mainAxios from '../../apis/main-axios';
import teacherApi from '../../apis/urlApi';
import { GradeData, SchoolYearSubjectResponse, SubjectProgram } from '../../types/response';


export default function SchoolProgram() {
    const [schoolProgram, setSchoolProgram] = useState<SubjectProgram[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [grades, setGrades] = useState<GradeData[]>([]);
    const [schoolYearSubjects, setSchoolYearSubjects] = useState<SchoolYearSubjectResponse[]>([]);

    const [defaultGradeId, setDefaultGradeId] = useState<number | undefined>();


    useEffect(() => {
        fetchGrades();
        fetchSchoolYearSubjects();
    }, []);

    useEffect(() => {
        if (defaultGradeId !== undefined) {
            fetchData(defaultGradeId);
        }
    }, [defaultGradeId]);

    const fetchData = (value: number) => {
        mainAxios.get(`/api/v1/school/school-year-subject-grade?gradeId=${value}`)
            .then(response => {
                setSchoolProgram(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchGrades = () => {
        teacherApi.getGrades()
            .then(response => {
                const gradesData = response.data.body;
                setGrades(gradesData);
                if (gradesData.length > 0) {
                    setDefaultGradeId(gradesData[0].id);
                }
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
            });
    };

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

    const handleChangeGrade = (value: number) => {
        fetchData(value)
    }

    return (
        <div className='p-4 md:p-6 2xl:p-10'>
            <Row style={{ marginBottom: '15px' }}>
                <Col span={12}>
                    <Select
                        className='w-30'
                        onChange={handleChangeGrade}
                        defaultValue={1}
                    >
                        {grades.map(grade => (
                            <Select.Option key={grade.id} value={grade.id}>
                                {grade.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
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
                        >
                            <Form.Item
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
                            </Form.Item>
                            <Form.Item
                                label="Môn học"
                                name="schoolYearSubjectId"
                                rules={[{ required: true, message: 'Vui lòng chọn một năm học!' }]}
                            >
                                <Select>
                                    {schoolYearSubjects.map(s => (
                                        <Select.Option key={s.id} value={s.id}>
                                            {s.subject.name}
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
                <Table.Column title="Môn học" dataIndex="schoolYearSubject"
                    render={(text, record: SubjectProgram) =>
                        `${record.schoolYearSubject.subject.name}`} />
                <Table.Column title="Khối" dataIndex="grade"
                    render={(text, record: SubjectProgram) =>
                        `${record.grade.name}`}
                />
                <Table.Column title="Số tiết" dataIndex="number" />
            </Table>
        </div>
    );
}