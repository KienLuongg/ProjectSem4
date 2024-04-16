import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select } from 'antd';
import axios from 'axios';

interface SchoolYearSubjectData {
    id: number;
    schoolYearId: string;
    subjectIds: string[];
}

interface Subject {
    id: number;
    name: string;
}

interface SchoolYear {
    id: string;
    name: string;
}

export default function SchoolYearSubject() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
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
        axios.get('http://14.248.97.203:4869/api/v1/school/subject')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    };

    const fetchSchoolYears = () => {
        // Fetch school years from API and set the state
        axios.get('http://14.248.97.203:4869/api/v1/school/school-year')
            .then(response => {
                setSchoolYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching school years:', error);
            });
    };

    const fetchData = () => {
        axios.get('http://14.248.97.203:4869/api/v1/school/school-year-subject')
            .then(response => {
                setSchoolYearSubject(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to get school year name by ID
    const getSchoolYearNameById = (schoolYearId: string): string => {
        const foundSchoolYear = schoolYears.find(schoolYear => schoolYear.id === schoolYearId);
        return foundSchoolYear ? foundSchoolYear.name : '';
    };

    // Function to get subject name by ID
    const getSubjectNameById = (subjectId: string): string => {
        const foundSubject = subjects.find(subject => subject.id === parseInt(subjectId));
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
            const formData = await form.validateFields(['subjectId', 'schoolYearId']);
            console.log(formData);
            // Send POST request
            const res = await axios.post('http://14.248.97.203:4869/api/v1/school/creat-school-year_subject', formData);
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
                                            {schoolYear.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <Table dataSource={SchoolYearSubject} rowKey="id">
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column title="Năm học" dataIndex="schoolYearId" render={(schoolYearId: string) => getSchoolYearNameById(schoolYearId)} />
                <Table.Column title="Môn học" dataIndex="subjectIds" render={(subjectIds: string[]) => subjectIds.map(subjectId => getSubjectNameById(subjectId)).join(', ')} />
            </Table>
        </div>
    );

}
