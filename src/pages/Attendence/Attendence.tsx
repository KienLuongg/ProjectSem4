import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DatePicker, Space } from 'antd';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { Table } from 'antd';
import { Checkbox } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Students from "../Students/Student-list";
import axios from "axios";
type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: number;
    Stt: number;
    Ho_Ten: string;
    Ngay_sinh: string;
    Co_Mat: JSX.Element;
    Nghi_Co_Phep: JSX.Element;
    Nghi_Khong_Phep: JSX.Element;
    Trang_Thai: number
}
interface DataAllClass {
    classId: string,
    className: string,
    SchoolBlock: {
        schoolBlockId: string,
        schoolBlockName: number
    }
}
interface Student {
    id: number,
    gender: boolean,
    firstName: string,
    lastName: string,
    birthday: string,
    address: string,
    status: number,
    studentCode: string,
}
const Attendences = () => {
    const AllClasses: DataAllClass[] = [{
        "classId": "01",
        "className": "1a1",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    }, {
        "classId": "02",
        "className": "1a2",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    },
    {
        "classId": "03",
        "className": "1a3",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    },
    {
        "classId": "04",
        "className": "1a4",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    },
    {
        "classId": "05",
        "className": "1a5",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    },
    {
        "classId": "06",
        "className": "1a6",
        SchoolBlock: {
            "schoolBlockId": "01",
            "schoolBlockName": 1
        }
    },
    {
        "classId": "07",
        "className": "2a1",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    },
    {
        "classId": "08",
        "className": "2a2",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    },
    {
        "classId": "09",
        "className": "2a3",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    },
    {
        "classId": "10",
        "className": "2a4",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    },

    {
        "classId": "11",
        "className": "2a5",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    }, {
        "classId": "12",
        "className": "2a6",
        SchoolBlock: {
            "schoolBlockId": "02",
            "schoolBlockName": 2
        }
    },
    {
        "classId": "13",
        "className": "3a1",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": "14",
        "className": "3a2",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": "15",
        "className": "3a3",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": "16",
        "className": "3a4",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": "17",
        "className": "3a5",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": "18",
        "className": "3a6",
        SchoolBlock: {
            "schoolBlockId": "03",
            "schoolBlockName": 3
        }
    },
    {
        "classId": "19",
        "className": "4a1",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "20",
        "className": "4a2",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "21",
        "className": "4a3",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "22",
        "className": "4a4",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "23",
        "className": "4a5",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "24",
        "className": "4a6",
        SchoolBlock: {
            "schoolBlockId": "04",
            "schoolBlockName": 4
        }
    },
    {
        "classId": "25",
        "className": "5a1",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    },
    {
        "classId": "26",
        "className": "5a2",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    },
    {
        "classId": "27",
        "className": "5a3",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    },
    {
        "classId": "28",
        "className": "5a4",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    },
    {
        "classId": "29",
        "className": "5a5",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    },
    {
        "classId": "30",
        "className": "5a6",
        SchoolBlock: {
            "schoolBlockId": "05",
            "schoolBlockName": 5
        }
    }
    ];
    const [student, setStudent] = useState<Student[]>([])
    // cont
    const getStudents = async () => {
        const s = await axios.get('http://14.248.97.203:4869/api/v1/student/students');
        setStudent(s.data);
    }
    useEffect(() => {
        getStudents();
    }, [student])
    console.log(student[1])
    const rowSelection: TableRowSelection<DataType> = {
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const columnsAttendenceByDay: TableColumnsType<DataType> = [
        {
            title: 'Stt',
            dataIndex: 'Stt',
            key: 'Stt',
            width: '5%',
            align: "center"
        },
        {
            title: 'Họ tên',
            dataIndex: 'Ho_Ten',
            key: 'Ho_Ten',
            width: '25%',
            align: "center"
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'Ngay_sinh',
            key: 'Ngay_sinh',
            width: '14%',
            align: "center"
        },
        {
            title: 'Có mặt',
            dataIndex: 'Co_Mat',
            width: '10%',
            key: 'Co_Mat',
            align: "center"
        },
        {
            title: 'Nghỉ có phép',
            dataIndex: 'Nghi_Co_Phep',
            width: '10%',
            key: 'Nghi_Co_Phep',
            align: "center"
        },
        {
            title: 'Nghỉ không phép',
            dataIndex: 'Nghi_Khong_Phep',
            width: '10%',
            key: 'Nghi_Khong_Phep',
            align: "center"
        },
        {
            title: 'Trạng thái',
            dataIndex: 'Trạng_Thái',
            width: '14%',
            key: 'Trạng_Thái',
            align: "center"
        }
    ];
    const dataAttendenceByDay = student.map((data) => ({
        key: data.id,
        Ho_Ten: data.lastName + data.firstName, // Assuming `s` contains the name of the student
        Ngay_sinh: data.birthday.split('T')[0],
        Stt: data.id,
        Co_Mat: <Checkbox></Checkbox>,
        Nghi_Co_Phep: <Checkbox></Checkbox>,
        Nghi_Khong_Phep: <Checkbox></Checkbox>,
        Trang_Thai: data.studentCode
    }));
    const columnsAttendenceByMonth: TableColumnsType<DataType> = [
        {
            title: 'Stt',
            dataIndex: 'Stt',
            key: 'Stt',
            width: '5%',
            align: "center"
        },
        {
            title: 'Họ tên',
            dataIndex: 'Ho_Ten',
            key: 'Ho_Ten',
            width: '25%',
            align: "center"
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'Ngay_sinh',
            key: 'Ngay_sinh',
            width: '14%',
            align: "center"
        },
        {
            title: 'Số Lượt Muộn',
            dataIndex: 'So_Luot_Muon',
            key: 'So_Luot_Muon',
            width: '14%',
            align: "center"
        },
        {
            title: 'Tổng Ngày Nghỉ',
            dataIndex: 'Tong_Ngay_nghi',
            width: '10%',
            key: 'Tong_Ngay_nghi',
            align: "center"
        },
        {
            title: 'Nghỉ Có Phép',
            dataIndex: 'Nghi_Co_Phep',
            width: '10%',
            key: 'Nghi_Co_Phep',
            align: "center"
        },
        {
            title: 'Nghỉ không phép',
            dataIndex: 'Nghi_Khong_Phep',
            width: '10%',
            key: 'Nghi_Khong_Phep',
            align: "center"
        },
    ];
    const dataAttendenceByMonth = student.map((data) => ({
        key: data.id,
        Ho_Ten: data.lastName + data.firstName, // Assuming `s` contains the name of the student
        Ngay_sinh: data.birthday.split('T')[0],
        Stt: data.id,
        So_Luot_Muon: 10,
        Tong_Ngay_nghi: 10,
        Nghi_Co_Phep: 5,
        Nghi_Khong_Phep: 5,
    }));

    const [classes, setClasses] = useState("1a1");
    const [classNameClass, setClassNameClass] = useState("hiddens");
    const choseClass = (className: string) => {
        setClasses(className);
        setClassNameClass("hiddens")

    }
    const [attendence, setAtendence] = useState("attendance-by-day");

    return (
        <div className="attendances ">
            <div className="attendanceItem">
                <div className={`attendance ${attendence === "attendance-by-day" ? "actives" : ""}`} onClick={() => setAtendence("attendance-by-day")}>
                    Điểm danh theo ngày
                </div>
                <div className={`attendance ${attendence === "attendance-by-month" ? "actives" : ""}`} onClick={() => setAtendence("attendance-by-month")}>
                    Điểm danh theo tháng
                </div>
            </div>
            <div className={`${attendence !== "attendance-by-day" ? "hiddens" : "attendance-by-day"}`}>
                <div style={{ display: "flex", padding: "16px" }}>
                    <div className="class">
                        <div onClick={() => {
                            if (classNameClass === "hiddens") {
                                setClassNameClass("show")
                            } else {
                                setClassNameClass("hiddens")
                            }
                        }} style={{
                            width: "117px",
                            padding: "4px 0px 4px 16px",
                            borderRadius: "3px",
                            border: "1px solid #3333",
                            marginRight: "13px"
                        }}>
                            {AllClasses.find(c => c.className === classes)?.className}
                            <IoIosArrowDown style={{
                                float: "right",
                                marginRight: "3px",
                                marginTop: "3px"
                            }} />
                        </div>
                        <div className={classNameClass}>

                            {AllClasses.map((c => (
                                <div onClick={() => choseClass(c.className)} key={c.classId} className="classItem">
                                    {c.className}
                                </div>
                            )))}
                        </div>

                    </div>
                    <Space direction="vertical">
                        <DatePicker disabledDate={(date) => {
                            return date.isBefore(dayjs(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)))
                        }} />
                    </Space>
                    <div className="number-student">
                        Tất cả : 38
                    </div>
                    <div className="number-student-go-to-school">
                        Có mặt : 38
                    </div>
                    <div className="Study-permits-are-allowed">
                        Có phép : 0
                    </div>
                    <div className="Study-permits-are-not-allowed">
                        Không phép : 0
                    </div>
                    <div style={{ width: "560px" }}>
                        <Button type="primary" style={{ float: "right", background: "#349634" }}>Thông báo cho PH</Button>
                    </div>
                </div>
                <div className="list-student">
                    <Table

                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columnsAttendenceByDay}
                        dataSource={dataAttendenceByDay}
                        pagination={false}
                        bordered
                        scroll={{ y: 385 }}
                    />
                </div>
                <div className="submit">
                    <Button type="primary" className="btn-submit">Lưu Lại</Button>
                </div>
            </div>
            <div className={`${attendence !== "attendance-by-month" ? "hiddens" : "attendance-by-month"}`}>
                <div style={{ display: "flex", padding: "16px" }}>
                    <div className="class">
                        <div onClick={() => {
                            if (classNameClass === "hiddens") {
                                setClassNameClass("show")
                            } else {
                                setClassNameClass("hiddens")
                            }
                        }} style={{
                            width: "117px",
                            padding: "4px 0px 4px 16px",
                            borderRadius: "3px",
                            border: "1px solid #3333",
                            marginRight: "13px"
                        }}>
                            {AllClasses.find(c => c.className === classes)?.className}
                            <IoIosArrowDown style={{
                                float: "right",
                                marginRight: "3px",
                                marginTop: "3px"
                            }} />
                        </div>
                        <div className={classNameClass}>

                            {AllClasses.map((c => (
                                <div onClick={() => choseClass(c.className)} key={c.classId} className="classItem">
                                    {c.className}
                                </div>
                            )))}
                        </div>

                    </div>
                    <Space direction="vertical">
                        <DatePicker disabledDate={(date) => {
                            return date.isBefore(dayjs(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)))
                        }} />
                    </Space>
                </div>
                <div className="list-student">
                    <Table
                        columns={columnsAttendenceByMonth}
                        dataSource={dataAttendenceByMonth}
                        pagination={false}
                        bordered
                        scroll={{ y: 385 }}
                    />
                </div>
                <div className="submit">
                    <Button type="primary" className="btn-submit">Lưu Lại</Button>
                </div>
                <div className="submit">
                    <Button type="primary" className="btn-submit">Sửa Đổi</Button>
                </div>
            </div>

        </div>
    )

}
export default Attendences;