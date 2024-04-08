import { Button, Col, Row, Select, Form, Input, Table, Modal, Radio, DatePicker } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';

const options = [
  { value: '1A1', label: '1A1' },
  { value: '1A2', label: '1A2' },
  { value: '1A3', label: '1A3' },
];

interface StudentData {
  id: string;
  studentCode: string;
  full_name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  birthday: string;
  birthplace: string;
  gender: string;
  status: string;
}

// const fakeData: StudentData[] = [
//   {
//     key: '1',
//     studentCode: '001',
//     name: 'John Doe',
//     status: 'Active',
//     birthdate: '1990-01-01',
//     birthplace: 'City A'
//   },
//   {
//     key: '2',
//     studentCode: '002',
//     name: 'Jane Smith',
//     status: 'Inactive',
//     birthdate: '1995-05-15',
//     birthplace: 'City B'
//   },
//   // Add more fake data objects as needed
// ];


const renderSTT = (text: string, record: string, index: number) => <span>{index + 1}</span>;

export default function Students() {

  const [students, setStudents] = useState<StudentData[]>([]);


  useEffect(() => {
    // Fetch data for the table on component mount
    axios.get('http://14.248.97.203:4869/api/v1/student/students')
      .then(response => {
        // Update state with fetched data
        setStudents(response.data);
        console.log("Fetched students:", response.data); // Log fetched students
      })
      .catch(error => {
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

  const handleSubmit = (formData: any) => {
    // Make POST request to submit form data
    axios.post('http://14.248.97.203:4869/api/v1/students', formData)
      .then(response => {
        // Handle successful submission
        console.log('Data submitted:', response.data);
        // Close modal
        setIsModalOpen(false);
        // Optionally, you can fetch updated data for the table here
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div>
      <Breadcrumb pageName='Students' />
      <Row style={{ marginBottom: '20px' }}>
        {/* Năm học */}
        <Col span={6}>
          <Form.Item
            label="Năm học"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Khối */}
        <Col span={6}>
          <Form.Item
            label="Khối"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Lớp */}
        <Col span={6}>
          <Form.Item
            label="Lớp"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Giới tính */}
        <Col span={6}>
          <Form.Item
            label="Giới tính"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: '15px' }}>
        {/* Tìm kiếm theo tên */}
        <Col span={6}>
          <Form.Item
            label="Tên"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền tên học sinh" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Tìm kiếm theo mã */}
        <Col span={6}>
          <Form.Item
            label="Mã học sinh"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền mã học sinh" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Form.Item
            label=" "
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px', paddingRight: '56px' }}
          >
            <div>
              <Button type="primary">Tìm kiếm</Button>
              <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
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
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      label="Địa chỉ:"
                      name="address"
                      rules={[{ required: true, message: 'Please input!' }]}
                    >
                      <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Table dataSource={students}
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          overflow: 'hidden',
          maxHeight: 380,
        }}
        bordered
        size="middle"
        virtual
        scroll={{ y: 380 }}
      >
        <Column
          title="STT"
          render={renderSTT}
          width={50}
          align="center"
          className="custom-column"
        />
        <Column
          title="Mã học sinh"
          dataIndex="studentCode"
          width={120}
          align="center"
          className="custom-column"
        />
        <Column
          title="Họ và tên"
          dataIndex="firstName"
          width={200}
          align="center"
          className="custom-column"
        />
        <Column title="Ngày sinh" dataIndex="birthday" align="center" className="custom-column" />
        <Column title="Nơi sinh" dataIndex="address" align="center" className="custom-column" />
        <Column title="Status" dataIndex="status" align="center" className="custom-column" />
      </Table>
    </div>
  );
}
