import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select } from 'antd';
import teacherApi from '../../apis/urlApi';
import { SchoolYearSubjectData, SchoolYearsData, Subjects } from '../../types/response';

export default function SchoolYearSubject() {
    const [subjects, setSubjects] = useState<Subjects[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);
    const [SchoolYearSubject, setSchoolYearSubject] = useState<SchoolYearSubjectData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchSubjects();
        fetchSchoolYears();
        fetchData();
    }, []);

    const fetchSubjects = () => {
        // Fetch subjects from API and set the state
        teacherApi.getSubjectById()
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    };

    const fetchSchoolYears = () => {
        // Fetch school years from API and set the state
        teacherApi.getSchoolYear()
            .then(response => {
                setSchoolYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching school years:', error);
            });
    };

    const fetchData = () => {
        teacherApi.getSchoolYearSubject()
            .then(response => {
                setSchoolYearSubject(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to get school year name by ID
    const getSchoolYearNameById = (schoolYearId: number): Date | null => {
        const foundSchoolYear = schoolYears.find(schoolYear => schoolYear.id === schoolYearId);
        return foundSchoolYear ? foundSchoolYear.startSem1 : null;
    };


    // Function to get subject name by ID
    const getSubjectNameById = (subjectId: number): string => {
        const foundSubject = subjects.find(subject => subject.id === subjectId);
        return foundSubject ? foundSubject.name : '';
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        try {
            // Validate form fields
            const formData = await form.validateFields();
            console.log(formData);
            // Send POST request
            const res = await teacherApi.postCreateSchoolYearSubject(formData);
            console.log('Data submitted:', res.data);
            setIsModalOpen(false);
            // Refresh school years data after successful submission
            fetchData();
            // Display success message to the user
            message.success('Data submitted successfully!');
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network Error:', error.request);
            } else {
                // Something else happened while setting up the request
                console.error('Error:', error.message);
            }
            // Display error message to the user
            message.error('Failed to submit data. Please try again later.');
        }
    };




    return (
        <div>
            <Row style={{ marginBottom: '15px' }}>
                <Col span={12}>

                </Col>
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
                            name="addSchoolYearSubjectForm"
                            labelCol={{ flex: '110px' }}
                            labelAlign="left"
                            labelWrap
                            wrapperCol={{ flex: 1 }}
                            colon={false}
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item
                                label="Môn học"
                                name="subjectId"
                                rules={[{ required: true, message: 'Please select a subject!' }]}
                            >
                                <Select>
                                    {subjects.map(subject => (
                                        <Select.Option key={subject.id} value={subject.id.toString()}>
                                            {subject.name}
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
                                            {schoolYear.id} {/* Render the ID of the school year */}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={SchoolYearSubject} rowKey="id" className=' text-black dark:text-white'>
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column
                    title="Năm học"
                    dataIndex="schoolYearId"
                    render={(schoolYearId: number) => {
                        const schoolYearName = getSchoolYearNameById(schoolYearId);
                        return schoolYearName ? schoolYearName.toString() : ''; // Convert Date to string and handle null case
                    }}
                />
                <Table.Column
                    title="Môn học"
                    dataIndex="subjectIds"
                    render={(subjectIds: number[]) => {
                        const subjectNames = subjectIds.map(subjectId => {
                            if (subjectId === 0) {
                                return 'Unknown'; // Handle the case where subjectId is 0
                            } else {
                                return getSubjectNameById(subjectId);
                            }
                        });
                        return subjectNames.join(', ');
                    }}
                />
            </Table>

        </div>
    );

}
