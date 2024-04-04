import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Row,
    Select,
    Form,
    Input,
    Table,
    Modal,
    DatePicker,
    Radio,
    Upload,
} from 'antd';
import Column from 'antd/es/table/Column';
import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const options = [
    { value: '1A1', label: '1A1' },
    { value: '1A2', label: '1A2' },
    { value: '1A3', label: '1A3' },
];

const renderSTT = (text: string, record: unknown, index: number) => <span>{index + 1}</span>;

export default function Teachers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Breadcrumb pageName='Classes' />
            <Row style={{ marginBottom: '20px' }}>
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

                <Col span={6}>
                    <Form.Item
                        label="Chức vụ"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Dạy môn"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Phòng ban"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Trạng thái làm việc"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

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
                        <Input type="text" placeholder="Điền tên giáo viên" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                {/* Tìm kiếm theo mã */}
                <Col span={6}>
                    <Form.Item
                        label="Số hiệu cán bộ"
                        labelAlign="left"
                        colon={false}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                    >
                        <Input type="text" placeholder="Điền số hiệu" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
            </Row>
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
                            <Button type="primary">Tìm kiếm</Button>
                            <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
                                Thêm
                            </Button>
                            <Modal
                                title="Thêm giáo viên"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
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
                                            name="lastname"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Tên:"
                                            name="firstname"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Ngày sinh:"
                                            name="Dob"
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

                                        <Form.Item
                                            label="Số điện thoại:"
                                            name="phone"
                                            rules={[
                                                { required: true, message: 'Please input!' },
                                                { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Email:"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Quốc tịch:"
                                            name="nation"
                                            rules={[{ required: true, message: 'Please input!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Số CCCD:"
                                            name="citizen-id"
                                            rules={[
                                                { required: true, message: 'Please input!' },
                                                { pattern: /^[0-9]+$/, message: 'Please enter a valid number!' },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Ảnh đại diện:"
                                            name="avatar"
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) => e.fileList}
                                        >
                                            <Upload name="avatar" listType="picture">
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
            <Table
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
                <Column title="Số hiệu cán bộ" width={120} align="center" className="custom-column" />
                <Column title="Họ và tên" width={200} align="center" className="custom-column" />
                <Column title="Giới tính" width={90} align="center" className="custom-column" />
                <Column title="Ngày sinh" align="center" className="custom-column" />{' '}
                <Column title="Phòng ban" align="center" className="custom-column" />
            </Table>
        </div>
    );
}
