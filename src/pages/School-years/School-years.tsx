import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Input, Table, Modal, DatePicker, message } from 'antd';
import axios from 'axios';

interface SchoolYearsData {
  id: number;
  startSem1: Date;
  startSem2: Date;
  end: Date;
}

export default function SchoolYears() {
  const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://14.248.97.203:4869/api/v1/school/school-year')
      .then(response => {
        setSchoolYears(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
      // Validate form fields
      const formData = await form.validateFields(['startSem1', 'startSem2', 'end']);
      console.log(formData);
      // Send POST request
      const res = await axios.post('http://14.248.97.203:4869/api/v1/school/creat-school-year', formData);
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
          <Form.Item
            label="Năm"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Tìm theo năm" style={{ width: '80%' }} />
          </Form.Item>
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
              name="addSchoolYearForm"
              labelCol={{ flex: '110px' }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label="Thời gian bắt đầu học kỳ I:"
                name="startSem1"
                rules={[{ required: true, message: 'Please input start date for semester 1!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Thời gian bắt đầu học kỳ II:"
                name="startSem2"
                rules={[{ required: true, message: 'Please input start date for semester 2!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Thời gian kết thúc:"
                name="end"
                rules={[{ required: true, message: 'Please input end date!' }]}
              >
                <DatePicker />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      <Table dataSource={schoolYears} rowKey="id">
        <Table.Column title="Id" dataIndex="id" />
        <Table.Column title="Học kỳ 1" dataIndex="startSem1" />
        <Table.Column title="Học kỳ 2" dataIndex="startSem2" />
        <Table.Column title="Kết thúc" dataIndex="end" />
      </Table>
    </div>
  );

}
