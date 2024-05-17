import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select } from 'antd';
import teacherApi from '../../apis/urlApi';
import {
  SchoolYearTeacherData,
  SchoolYearsData,
  TeacherData,
} from '../../types/response';
import { YearContext } from '../../context/YearProvider/YearProvider';
import Loader from '../../common/Loader';

export default function SchoolYearTeacher() {
  const [schoolYearTeachers, setSchoolYearTeachers] = useState<
    SchoolYearTeacherData[]
  >([]);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);

  useEffect(() => {
    fetchSchoolYears();
    fetchTeachers();
  }, []);
  const { idYear } = useContext(YearContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (idYear === null) return;
      setIsLoading(true);
      try {
        const res = await teacherApi.getTeacherSchoolYear(idYear);
        setSchoolYearTeachers(res.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idYear]);

  const fetchSchoolYears = () => {
    teacherApi
      .getSchoolYear()
      .then((response) => {
        setSchoolYears(response.data);
      })
      .catch((error) => {
        console.error('Error fetching school years:', error);
      });
  };

  const fetchTeachers = () => {
    teacherApi
      .getTeacher()
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
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

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <Row className="mb-4">
        <Col span={12}></Col>
        <Col span={12} className="text-right">
          <Button type="default" onClick={showModal} className="">
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
                rules={[
                  { required: true, message: 'Please select a teacher!' },
                ]}
              >
                <Select></Select>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          dataSource={schoolYearTeachers}
          rowKey="id"
          className="text-black dark:text-white"
        >
          <Table.Column title="Id" dataIndex="id" className="w-1/12" />
          <Table.Column title="Giáo viên" filterDropdown />
          <Table.Column title="Chủ nhiệm" filterDropdown />
        </Table>
      )}
    </div>
  );
}
