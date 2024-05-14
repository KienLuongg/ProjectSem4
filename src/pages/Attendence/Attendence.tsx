import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DatePicker, Select, Space } from 'antd';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { Table } from 'antd';
import { Checkbox } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Students from "../Students/Student-list";
import axios from "axios";
import { DataAllClass, DataTypeAttendence, Student } from "../../types/response";
import mainAxios from "../../apis/main-axios";
type TableRowSelection<T> = TableProps<T>['rowSelection'];


const Attendences = () => {
    const AllClasses: DataAllClass[] = [{
        "classId": 1,
        "className": "1a1",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    }, {
        "classId": 2,
        "className": "1a2",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    },
    {
        "classId": 3,
        "className": "1a3",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    },
    {
        "classId": 4,
        "className": "1a4",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    },
    {
        "classId": 5,
        "className": "1a5",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    },
    {
        "classId": 6,
        "className": "1a6",
        SchoolBlock: {
            "schoolBlockId": 1,
            "schoolBlockName": 1
        }
    },
    {
        "classId": 7,
        "className": "2a1",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    },
    {
        "classId": 8,
        "className": "2a2",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    },
    {
        "classId": 9,
        "className": "2a3",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    },
    {
        "classId": 10,
        "className": "2a4",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    },

    {
        "classId": 11,
        "className": "2a5",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    }, {
        "classId": 12,
        "className": "2a6",
        SchoolBlock: {
            "schoolBlockId": 2,
            "schoolBlockName": 2
        }
    },
    {
        "classId": 13,
        "className": "3a1",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": 14,
        "className": "3a2",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": 15,
        "className": "3a3",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": 16,
        "className": "3a4",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": 17,
        "className": "3a5",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    }
        ,
    {
        "classId": 18,
        "className": "3a6",
        SchoolBlock: {
            "schoolBlockId": 3,
            "schoolBlockName": 3
        }
    },
    {
        "classId": 19,
        "className": "4a1",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 20,
        "className": "4a2",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 21,
        "className": "4a3",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 22,
        "className": "4a4",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 23,
        "className": "4a5",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 24,
        "className": "4a6",
        SchoolBlock: {
            "schoolBlockId": 4,
            "schoolBlockName": 4
        }
    },
    {
        "classId": 25,
        "className": "5a1",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    },
    {
        "classId": 26,
        "className": "5a2",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    },
    {
        "classId": 27,
        "className": "5a3",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    },
    {
        "classId": 28,
        "className": "5a4",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    },
    {
        "classId": 29,
        "className": "5a5",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    },
    {
        "classId": 30,
        "className": "5a6",
        SchoolBlock: {
            "schoolBlockId": 5,
            "schoolBlockName": 5
        }
    }
    ];
    const [student, setStudent] = useState<Student[]>([])
    const [classe, setClasse] = useState<DataAllClass[]>(AllClasses);
    const getClass = localStorage.getItem('idClass');
    const [idClass, setIdClass] = useState(parseInt(getClass!) ?? 1);
    const idYear = localStorage.getItem('idYear');

    const options = classe.map(c => ({
        value: c.classId,
        label: c.className
    }));
    useEffect(() => {

        localStorage.setItem('idClass', idClass.toString())

    }, [idClass])
    const handleChange = (value: number) => {
        setIdClass(value)
    };
    // cont
    const getStudents = async () => {
        const s = await mainAxios.get(`/api/v1/student/get-student-year-info-by?bySchoolYearClassId=${idClass}`);
        setStudent(s.data);
    }
    useEffect(() => {
        getStudents();
    }, [student])
    const rowSelection: TableRowSelection<DataTypeAttendence> = {
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const formatDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = dateObject.getFullYear();
        return `${day}${month}${year}`;
    }
    const columnsAttendenceByDay: TableColumnsType<DataTypeAttendence> = [
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
            dataIndex: 'Trang_Thai',
            width: '14%',
            key: 'Trang_Thai',
            align: "center"
        }
    ];
    const dataAttendenceByDay = student.map((data) => ({
        key: data.id,
        Ho_Ten: data.students.lastName + ' ' + data.students.firstName, // Assuming `s` contains the name of the student
        Ngay_sinh: formatDate(data.students.birthday.substring(0, 10)),
        Stt: data.id,
        Co_Mat: <Checkbox></Checkbox>,
        Nghi_Co_Phep: <Checkbox></Checkbox>,
        Nghi_Khong_Phep: <Checkbox></Checkbox>,
        Trang_Thai: 0 ? "Đã thông báo" : "chưa thông báo"
    }));
    const columnsAttendenceByMonth: TableColumnsType<DataTypeAttendence> = [
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
        Ho_Ten: data.students.lastName + data.students.firstName, // Assuming `s` contains the name of the student
        Ngay_sinh: data.students.birthday.substring(0, 10),
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
                    <div style={{ marginRight: "14px" }}>
                        <Select style={{ width: "100px", height: "38px" }} options={options} defaultValue={getClass ? options.find(e => e.value == parseInt(getClass))?.value : options[0].value} onChange={handleChange} />
                    </div>
                    <Space direction="vertical">
                        <DatePicker disabledDate={(date) => {
                            return date.isBefore(dayjs(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)))
                        }} className="h-10" />
                    </Space>
                    <div className="mx-4 border border-solid border-green-500 w-36 flex items-center justify-center rounded-md h-10">
                        Tất cả :{student.length}
                    </div>
                    <div className="border border-solid border-gray-300 w-40 flex justify-center items-center rounded-md h-10">
                        Có mặt : 38
                    </div>
                    <div className="mx-4 border border-solid border-gray-300 w-45 rounded-md flex items-center justify-center h-10">
                        Có phép : 0
                    </div>
                    <div className="border border-solid border-gray-300 w-52 rounded-md flex justify-center items-center h-10">
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