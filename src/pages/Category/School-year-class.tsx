import { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Table, Modal, message, Select, Input } from 'antd';
import teacherApi from '../../apis/urlApi';
import { GradeData, RoomData, SchoolYearClassData, SchoolYearTeacherData, SchoolYearsData } from '../../types/response';


export default function SchoolYearClass() {
    const [schoolYearClass, setSchoolYearClass] = useState<SchoolYearClassData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [grades, setGrades] = useState<GradeData[]>([]);
    const [rooms, setRooms] = useState<RoomData[]>([]);
    const [teacherSchoolYears, setTeacherSchoolYears] = useState<SchoolYearTeacherData[]>([]);

    useEffect(() => {
        fetchData();
        fetchGrades();
        fetchRooms();
        fetchTeacherSchoolYears();
    }, []);

    const fetchData = () => {
        teacherApi.getSchoolYearClass()
            .then(response => {
                setSchoolYearClass(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchGrades = () => {
        teacherApi.getGrades()
            .then(response => {
                setGrades(response.data);
            })
            .catch(error => {
                console.error('Error fetching grades:', error);
            });
    };

    const fetchRooms = () => {
        teacherApi.getRooms()
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
            });
    };

    const fetchTeacherSchoolYears = () => {
        teacherApi.getTeacherSchoolYear()
            .then(response => {
                setTeacherSchoolYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher school years:', error);
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
            const res = await teacherApi.postCreateSchoolYearClass(formData);
            console.log('Data submitted:', res.data);
            setIsModalOpen(false);
            fetchData();
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
        <div>
            <Row justify="space-between" style={{ marginBottom: '15px' }}>
                <Col>
                    <Button type="default" onClick={showModal}>
                        Thêm
                    </Button>
                </Col>
                <Col>
                    <Modal
                        title="Thêm lớp"
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
                                label="Tên lớp"
                                name="className"
                                rules={[{ required: true, message: 'Vui lòng chọn giáo viên!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mã lớp"
                                name="classCode"
                                rules={[{ required: true, message: 'Vui lòng chọn năm học!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Adjusted labels for the following form items */}
                            <Form.Item
                                label="Khối học"
                                name="gradeId"
                                rules={[{ required: true, message: 'Vui lòng chọn khối học!' }]}
                            >
                                <Select>
                                    {grades.map((grade: any) => (
                                        <Select.Option key={grade.id} value={grade.id}>
                                            {grade.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Phòng học"
                                name="roomId"
                                rules={[{ required: true, message: 'Vui lòng chọn phòng học!' }]}
                            >
                                <Select>
                                    {rooms.map((room: any) => (
                                        <Select.Option key={room.id} value={room.id}>
                                            {room.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* <Form.Item
                                label="Giáo viên"
                                name="teacherSchoolYearId"
                                rules={[{ required: true, message: 'Vui lòng chọn giáo viên!' }]}
                            >
                                <Select>
                                    {teacherSchoolYears.map((teacher: any) => (
                                        <Select.Option key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item> */}
                        </Form>
                    </Modal>
                </Col>
            </Row>
            <div>
                <Row justify="space-between" style={{ marginBottom: '15px' }}>

                </Row>

                <Table dataSource={schoolYearClass} rowKey="id" className=' text-black dark:text-white'>
                    <Table.Column title="ID" dataIndex="id" />
                    <Table.Column title="Tên lớp" dataIndex="className" />
                    <Table.Column title="Mã lớp" dataIndex="classCode" />
                    <Table.Column title="Khối học" dataIndex="gradeId" />
                    <Table.Column title="Phòng học" dataIndex="roomId" />
                    <Table.Column title="Năm học" dataIndex="schoolYearId" />
                </Table>
            </div>
        </div>
    );
}
