import React, { useEffect, useState } from 'react';
import { Button, Form, message, Modal, Select, Table } from 'antd';
import teacherApi from '../../apis/urlApi';
import { SchoolYearSubjectData, SchoolYearsData, Subjects } from '../../types/response';

export default function SchoolYearSubject() {
    const [subjects, setSubjects] = useState<Subjects[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);
    const [schoolYearSubject, setSchoolYearSubject] = useState<SchoolYearSubjectData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
        fetchSubjects();
        fetchSchoolYears();
    }, []);

    const fetchData = () => {
        teacherApi.getSchoolYearSubject()
            .then(response => setSchoolYearSubject(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchSubjects = () => {
        teacherApi.getSubjectById()
            .then(response => setSubjects(response.data))
            .catch(error => console.error('Error fetching subjects:', error));
    };

    const fetchSchoolYears = () => {
        teacherApi.getSchoolYear()
            .then(response => setSchoolYears(response.data))
            .catch(error => console.error('Error fetching school years:', error));
    };

    const showModal = () => setIsModalOpen(true);

    const handleCancel = () => setIsModalOpen(false);

    const handleSubmit = async () => {
        try {
            const formData = await form.validateFields();
            const res = await teacherApi.postCreateSchoolYearSubject(formData);
            console.log('Data submitted:', res.data);
            setIsModalOpen(false);
            fetchData();
            message.success('Data submitted successfully!');
        } catch (error: any) {
            if (error.response) console.error('Server Error:', error.response.data);
            else if (error.request) console.error('Network Error:', error.request);
            else console.error('Error:', error.message);
            message.error('Failed to submit data. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 2xl:p-10">
            <div className="flex justify-between items-center mb-4">
                <Button type="default" onClick={showModal}>
                    Thêm
                </Button>
                <Modal
                    title="Thêm năm học"
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
                        name="addSchoolYearSubjectForm"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Form.Item
                            label="Môn học"
                            name="subjectId"
                            rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
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
                            rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
                        >
                            <Select>
                                {schoolYears.map(schoolYear => (
                                    <Select.Option key={schoolYear.id} value={schoolYear.id.toString()}>
                                        {schoolYear.id}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Table dataSource={schoolYearSubject} rowKey="id" className="text-black dark:text-white">
                <Table.Column title="Id" dataIndex="id" />
                <Table.Column
                    title="Môn học"
                    dataIndex="subjectIds"
                    render={(subjectIds: number[]) => {
                        const subjectNames = subjectIds.map(subjectId => {
                            const foundSubject = subjects.find(subject => subject.id === subjectId);
                            return foundSubject ? foundSubject.name : '';
                        });
                        return subjectNames.join(', ');
                    }}
                />
            </Table>
        </div>
    );
}
