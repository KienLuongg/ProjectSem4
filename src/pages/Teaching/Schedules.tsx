import { useEffect, useState } from 'react';
import { Button, Form, Table, Modal, Select, Input } from 'antd';
import Loader from '../../common/Loader';
import teacherApi from '../../apis/urlApi';
import { Lesson, SchoolYearClassData } from '../../types/response';
import mainAxios from '../../apis/main-axios';

export default function Schedules() {
    const [schoolYearClass, setSchoolYearClass] = useState<SchoolYearClassData[]>([]);
    const [scheduleData, setScheduleData] = useState<Lesson[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchClass = () => {
        setIsLoading(true);
        teacherApi.getSchoolYearClass()
            .then(response => {
                setSchoolYearClass(response?.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }

    const fetchScheduleData = () => {
        setIsLoading(true);
        // Replace with your API call to fetch schedule data
        mainAxios.get('/api/v1/schedule')
            .then(response => {
                setScheduleData(response?.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching schedule data:', error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchClass();
        fetchScheduleData();
    }, []);

    const transformData = (data: any[]) => {
        const periods = ["1", "2", "3", "4", "5"];
        const days = ["T2", "T3", "T4", "T5", "T6"];

        const tableData = periods.map(period => {
            const rowData = { period };

            days.forEach(day => {
                const lesson = data.find(d => d.indexLesson === parseInt(period) && d.dayOfWeek === day);
                rowData[day.toLowerCase()] = lesson ? lesson.subjectName : '';
            });

            return rowData;
        });

        return tableData;
    };

    const tableData = transformData(scheduleData);

    return (
        <div className="p-4">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Select
                                placeholder="Chọn lớp"
                                className="w-full md:w-3/4 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                {schoolYearClass.map(cls => (
                                    <Select.Option key={cls.id} value={cls.id}>
                                        {cls.className}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="text-right">
                            <Button type="default" onClick={showModal} className="rounded-md bg-blue-500 hover:bg-blue-600 text-white">
                                Thêm
                            </Button>
                        </div>
                    </div>
                    <Table dataSource={tableData} rowKey="period" className='table-auto text-black dark:text-white mt-4'>
                        <Table.Column
                            title="Tiết"
                            dataIndex="period"
                            className='w-1'
                        />
                        <Table.Column
                            title="Thứ 2"
                            dataIndex="t2"
                        />
                        <Table.Column
                            title="Thứ 3"
                            dataIndex="t3"
                        />
                        <Table.Column
                            title="Thứ 4"
                            dataIndex="t4"
                        />
                        <Table.Column
                            title="Thứ 5"
                            dataIndex="t5"
                        />
                        <Table.Column
                            title="Thứ 6"
                            dataIndex="t6"
                        />
                    </Table>
                    <Modal
                        title="Thêm năm học"
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel} className="rounded-md border border-gray-300">
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" className="rounded-md bg-blue-500 hover:bg-blue-600 text-white" onClick={() => form.submit()}>
                                Submit
                            </Button>,
                        ]}
                        className="w-3/5"
                    >
                        <Form
                            form={form}
                            name="addSchoolYearClassForm"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={(values) => {
                                console.log('Form Values:', values);
                                setIsModalOpen(false);
                            }}
                        >
                            <Form.Item
                                label="Tên lớp"
                                name="className"
                                rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mã lớp"
                                name="classCode"
                                rules={[{ required: true, message: 'Vui lòng nhập mã lớp!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </div>
    );
}
