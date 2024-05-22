import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import axios from 'axios';
import mainAxios from '../../apis/main-axios';
import { YearContext } from '../../context/YearProvider/YearProvider';

function Schedules() {
  const [schedule, setSchedule] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();
  const { idYear } = useContext(YearContext);
  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    const response = await mainAxios.get(
      `/api/v1/schedule?schoolYearId=${idYear}`
    );
    setSchedule(response.data);
  };

  const showModal = (item) => {
    setCurrentItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentItem(null);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/path/to/schedule/${id}`);
    fetchSchedule();
    notification.success({
      message: 'Deleted',
      description: 'The class has been successfully deleted.',
    });
  };

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    if (currentItem) {
      await axios.put(`/api/path/to/schedule/${currentItem.id}`, values);
    } else {
      await axios.post('/api/path/to/schedule', values);
    }
    fetchSchedule();
    handleCancel();
    notification.success({
      message: 'Success',
      description: currentItem
        ? 'Class updated successfully!'
        : 'New class added successfully!',
    });
  };

  const columns = [
    { title: 'Day of Week', dataIndex: 'dayOfWeek', key: 'dayOfWeek' },
    { title: 'Study Time', dataIndex: 'studyTime', key: 'studyTime' },
    { title: 'Subject Name', dataIndex: 'subjectName', key: 'subjectName' },
    { title: 'Teacher Name', dataIndex: 'teacherName', key: 'teacherName' },
    { title: 'Class Name', dataIndex: 'className', key: 'className' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="danger">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>
        Add New Class
      </Button>
      <Table columns={columns} dataSource={schedule} rowKey="id" />
      <Modal
        title={currentItem ? 'Edit Class' : 'Add New Class'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="dayOfWeek"
            label="Day of Week"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="studyTime"
            label="Study Time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subjectName"
            label="Subject Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="teacherName" label="Teacher Name">
            <Input />
          </Form.Item>
          <Form.Item name="className" label="Class Name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Schedules;
j