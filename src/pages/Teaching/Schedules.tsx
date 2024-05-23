import { useState } from 'react';
import { Button, Form, Input, Table, Modal } from 'antd';
import Loader from '../../common/Loader';


export default function Schedules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Khối"
                className="w-full md:w-3/4 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="text-right">
              <Button
                type="default"
                onClick={showModal}
                className="rounded-md bg-blue-500 hover:bg-blue-600 "
              >
                Thêm
              </Button>
            </div>
          </div>
          <Table
            rowKey="id"
            className="table-auto text-black dark:text-white mt-4"
          >
            <Table.Column title="Id" dataIndex="id" />
            <Table.Column title="Thứ" dataIndex="" />
            <Table.Column title="Tiết" dataIndex="" />
            <Table.Column title="" dataIndex="" />
          </Table>
          <Modal
            title="Thêm năm học"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                onClick={handleCancel}
                className="rounded-md border border-gray-300 "
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                className="rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit
              </Button>,
            ]}
            className="w-3/5"
          >
            <Form
              form={form}
              name=""
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            ></Form>
          </Modal>
        </>
      )}
    </div>
  );
}
