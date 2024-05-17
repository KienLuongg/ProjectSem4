import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, message, Modal, Select, Table } from 'antd';
import teacherApi from '../../apis/urlApi';
import {
  SchoolYearSubjectResponse,
  SchoolYearsData,
  Subjects,
} from '../../types/response';
import { data } from 'jquery';
import { YearContext } from '../../context/YearProvider/YearProvider';
import Loader from '../../common/Loader';

export default function SchoolYearSubject() {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [schoolYearSubject, setSchoolYearSubject] = useState<
    SchoolYearSubjectResponse[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    fetchData();
    fetchSubjects();
  }, []);

  const fetchData = () => {
    teacherApi
      .getSchoolYearSubject()
      .then((response) => setSchoolYearSubject(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchSubjects = () => {
    teacherApi
      .getSubjectById()
      .then((response) => setSubjects(response.data))
      .catch((error) => console.error('Error fetching subjects:', error));
  };

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);
  const { idYear } = useContext(YearContext);
  // const getSchoolYearId = localStorage.getItem('idYear');

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      formData['schoolYearId'] = idYear;
      const res = await teacherApi.postCreateSchoolYearSubject(formData);
      setIsLoading(!isLoading);
      setIsModalOpen(false);
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
          title="Thêm môn học"
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
          {isLoading ? (
            <Loader />
          ) : (
            <Form
              form={form}
              name="addSchoolYearSubjectForm"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item
                label="Môn học"
                name="subjectIds"
                rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
              >
                <Select mode="multiple">
                  {subjects.map((subject) => (
                    <Select.Option key={subject.id} value={subject.id}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
      <Table
        dataSource={schoolYearSubject}
        rowKey="id"
        className="text-black dark:text-white"
      >
        <Table.Column title="Id" dataIndex="id" />
        <Table.Column
          title="Môn học"
          dataIndex="subject"
          render={(subject: { name: string }) => subject.name}
        />
      </Table>
    </div>
  );
}
