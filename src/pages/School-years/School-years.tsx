import { Button, Col, Row, Select, Form, Input, Table, Modal, Radio, DatePicker } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';

const options = [
  { value: '1A1', label: '1A1' },
  { value: '1A2', label: '1A2' },
  { value: '1A3', label: '1A3' },
];

interface SchoolYearsData {
  id: string;
  startSem1: string;
  startSem2: string;
  end: string;
}

const renderSTT = (text: string, record: string, index: number) => <span>{index + 1}</span>;

export default function SchoolYears() {

  const [schoolYears, setSchoolYears] = useState<SchoolYearsData[]>([]);


  useEffect(() => {
    // Fetch data for the table on component mount
    axios.get('http://14.248.97.203:4869/api/v1/school/school-year')
      .then(response => {
        // Update state with fetched data
        setSchoolYears(response.data);
        console.log("Fetched:", response.data); // Log fetched students
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
    axios.post('http://14.248.97.203:4869/api/v1/school/creat-school-year', formData)
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


  // const handleEditButtonClick = (record) => {
  //   // Redirect to the edit page for the specific student
  //   navigate(`/edit-student/${record.studentId}`);
  // };
  return (
    <div>
      <Breadcrumb pageName='School Years' />
      <Row style={{ marginBottom: '15px' }}>
        {/* Tìm kiếm theo tên */}
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
          <Form.Item
            label=" "
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px', paddingRight: '' }}
          >
            <div>

              <Button type="default" onClick={showModal} style={{ marginLeft: '' }}>
                Thêm
              </Button>
              {/* Modal */}
              <Modal
                title="Thêm năm học"
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
                      label="Thời gian bắt đầu học kỳ I:"
                      name="sem1"
                      rules={[{ required: true, message: 'Please input!' }]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      label="Thời gian bắt đầu học kỳ II:"
                      name="sem2"
                      rules={[{ required: true, message: 'Please input!' }]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      label="Thời gian kết thúc:"
                      name="end-date"
                      rules={[{ required: true, message: 'Please input!' }]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
              {/* Modal */}

            </div>
          </Form.Item>
        </Col>
      </Row>
      <Table
        dataSource={schoolYears}
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
          render={(text, record, index) => index + 1} // Renders the row number starting from 1
          width={50}
          align="center"
          className="custom-column"
        />
        <Column
          title="Năm học"
          dataIndex="id"
          width={120}
          align="center"
          className="custom-column"
        />
        <Column
          title="Học kỳ I"
          dataIndex="startSem1"
          align="center"
          className="custom-column"
        />
        <Column
          title="Học kỳ II"
          dataIndex="startSem2"
          align="center"
          className="custom-column"
        />
        <Column
          title="Kết thúc"
          dataIndex="end"
          align="center"
          className="custom-column"
        />
      </Table>

    </div>
  );
}
