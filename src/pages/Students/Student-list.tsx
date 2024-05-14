import {
  Button,
  Col,
  Row,
  Select,
  Form,
  Input,
  Table,
  Modal,
  Radio,
  DatePicker,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import teacherApi from '../../apis/urlApi';
import mainAxios from '../../apis/main-axios';
import { Student } from '../../types/response';



export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form] = Form.useForm();
  const getYear = localStorage.getItem('idYear');

  useEffect(() => {
    mainAxios.get(`/api/v1/student/get-student-year-info-by?bySchoolYearId=${getYear}`)
      .then((response) => {
        setStudents(response.data);
        console.log('Fetched students:', response.data); // Log fetched students
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  // Hàm để mở modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      console.log(formData);
      const res = await mainAxios.post('/api/v1/student', formData);
      console.log('Data submitted:', res.data);
      setIsModalOpen(false);

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

  const renderStudentStatuses = (text: any, record: Student) => {
    return record.students.studentStatuses
      .map(status => status.description)
      .join(', ');
  };

  return (
    <div className='p-4 md:p-6 2xl:p-10'>


      <Button
        type="default"
        onClick={showModal}
        className='mb-4'
      >
        Thêm
      </Button>
      <Modal
        title="Thêm học sinh"
        open={isModalOpen}
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
        <div>
          <Form
            form={form}
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Họ:"
              name="lastName"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tên:"
              name="firstName"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày sinh:"
              name="birthday"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Giới tính:"
              name="gender"
              rules={[{ required: true, message: 'Please select!' }]}
            >
              <Radio.Group>
                <Radio value="true">Nam</Radio>
                <Radio value="false">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Địa chỉ:"
              name="address"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
            </Form.Item>

            <Form.Item
              label="Mã học sinh:"
              name="studentCode"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item><Form.Item
              label="Năm:"
              name="schoolYearClassId"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Bảng hiển thị danh sách học sinh */}
      <Table dataSource={students} rowKey="id">
        <Table.Column
          title="Mã học sinh"
          render={(text, record: Student) =>
            `${record.students.studentCode}`
          }
        />
        <Table.Column
          title="Họ và tên"
          render={(text, record: Student) =>
            `${record.students.firstName} ${record.students.lastName}`
          }
        />
        <Table.Column
          title="Ngày sinh"
          render={(text, record: Student) => {
            const date = new Date(record.students.birthday);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          }}
        />
        <Table.Column
          title="Giới tính"
          render={(text, record: Student) =>
            `${record.students.studentCode}`
          }
        />
        <Table.Column
          title="Địa chỉ"
          render={(text, record: Student) =>
            `${record.students.address}`
          }
        />
        <Table.Column
          title="Trạng thái"
          render={renderStudentStatuses}
        />
      </Table>
    </div>
  );
}
