import { Button, Col, Form, Input, Row, Select, Table, Modal, DatePicker, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import mainAxios from '../../apis/main-axios';
import { TeacherData } from '../../types/response'
import Loader from '../../common/Loader';
const options = [
    { value: '1A1', label: '1A1' },
    { value: '1A2', label: '1A2' },
    { value: '1A3', label: '1A3' },
];

interface Role {
    id: number,
    name: string
}

interface ErrRes {
    timestamp: string
    statusCode: number
    message: string
    path: string
    error: string
}
export default function Teachers({ onAdd }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [roles, setRoles] = useState<Role[]>([]); // Renamed `role` to `roles`
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Fetch teacher
        fetTeacher();
        // Fetch roles
        fetchRoles();
    }, []);


    const fetchRoles = async () => {
        try {
            const r = await mainAxios.get('/api/v1/school/get-roles');
            setRoles(r.data.body)
        } catch (error) {
            console.table(error)
            // Fetch data for the table on component mount
        }

    };
    const fetTeacher = async () => {
        mainAxios.get('/api/v1/teacher')
            .then(response => {
                // Update state with fetched data
                setTeachers(response.data);
                setIsLoading(false);
                console.log("Fetched teachers:", response.data); // Log fetched teachers
            })
            .catch(error => {
                // Handle error
                setIsLoading(false);
                console.error('Error fetching teachers:', error);
            });

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        console.log(values)
        // values['role'] = [1];
        values['gender'] = values['gender'] === "true";
        values['avatar'] = values['avatar'].length > 0 ? values['avatar'].thumbUrl : ''

        // Call postCreateSchoolYear function from teacherApi
        await mainAxios.post('/api/v1/teacher', values)
            .then(response => {
                setIsModalOpen(false);
                message.success("thêm giáo viên thành công")
                fetTeacher()
            }).catch((err) => {
                var error = err.response.data as ErrRes;
                console.log(error)
                message.error(error.message);

            })

    }
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const role = roles.map(r => ({
        value: r.id,
        label: r.name
    }));
    return (<>
        {isLoading ? (
            <Loader />
        ) : (
            <div>

                <Breadcrumb pageName='Teachers' />
                <Row style={{ marginBottom: '15px' }}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item
                            label=" "
                            labelAlign="left"
                            colon={false}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px', paddingRight: '56px' }}
                        >
                            <div>
                                <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
                                    Thêm
                                </Button>
                                <Modal
                                    title="Thêm giáo viên"
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
                                    style={{ minWidth: 800 }}
                                >
                                    <div>
                                        <Form
                                            name="wrap"
                                            labelCol={{ flex: '90px' }}
                                            labelAlign="left"
                                            labelWrap
                                            wrapperCol={{ flex: 1 }}
                                            colon={false}
                                            style={{ maxWidth: 650 }}
                                            form={form}
                                        >
                                            <Row gutter={[16, 0]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Tên tài khoản:"
                                                        name="username"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Mật khẩu:"
                                                        name="password"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Chức vụ:"
                                                        name="role"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Select mode="tags" style={{ width: '100%' }} placeholder="" onChange={handleChange} options={role} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Họ:"
                                                        name="lastname"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>


                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Tên:"
                                                        name="firstname"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày sinh:"
                                                        name="birthday"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <DatePicker />
                                                    </Form.Item></Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Giới tính:"
                                                        name="gender"
                                                        rules={[{ required: true, message: 'Please select!' }]}
                                                    >
                                                        <Radio.Group>
                                                            <Radio value="false">Nam</Radio>
                                                            <Radio value="true">Nữ</Radio>
                                                        </Radio.Group>
                                                    </Form.Item></Col>

                                            </Row>

                                            <Row gutter={[16, 0]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Số CCCD:"
                                                        name="citizen_id"
                                                        rules={[
                                                            { required: true, message: 'Please input!' },
                                                            { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Số điện thoại:"
                                                        name="phone"
                                                        rules={[
                                                            { required: true, message: 'Please input!' },
                                                            { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Địa chỉ:"
                                                        name="address"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Email:"
                                                        name="email"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                            </Row>

                                            <Row gutter={[16, 0]}>

                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Quốc tịch:"
                                                        name="nation"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Số hiệu cán bộ:"
                                                        name="officerNumber"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Biệt danh"
                                                        name="sortName"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <Input />

                                                    </Form.Item></Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày bắt đầu:"
                                                        name="joiningDate"
                                                        rules={[{ required: true, message: 'Please input!' }]}
                                                    >
                                                        <DatePicker />
                                                    </Form.Item></Col>

                                            </Row>

                                            <Form.Item
                                                label="Ảnh đại diện:"
                                                name="avatar"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => [e.fileList[0]]} // Chỉ lấy phần tử đầu tiên trong fileList
                                            >
                                                <Upload
                                                    name="avatar"
                                                    listType="picture"
                                                    beforeUpload={() => false} // Ngăn chặn tự động tải lên
                                                >
                                                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Table dataSource={teachers} rowKey="id">
                    <Table.Column title="Số hiệu" dataIndex="officerNumber" />
                    <Table.Column
                        title="Họ và tên"
                        render={(text, record: TeacherData) =>
                            `${record.user.userDetail.firstname} ${record.user.userDetail.firstname}`
                        }
                    />
                    <Table.Column title="Ngày sinh" render={(text, record: TeacherData) =>
                        `${record.user.userDetail.birthday}`
                    } />
                    <Table.Column title="Giới tính" render={(text, record: TeacherData) =>
                        `${record.user.userDetail.gender === "true" ? "famale" : "male"}`
                    } />
                    <Table.Column title="Địa chỉ" render={(text, record: TeacherData) =>
                        `${record.user.userDetail.address}`
                    } />

                    <Table.Column title="Vị trí" render={(text, record: TeacherData) =>
                        `${record.user.roles.map(r => {
                            return r.name
                        })}`
                    } />
                    <Table.Column title="Ngày gia nhập" render={(text, record: TeacherData) =>
                        `${record.joiningDate}`
                    } />
                </Table>

            </div>
        )}
    </>
    );
}
