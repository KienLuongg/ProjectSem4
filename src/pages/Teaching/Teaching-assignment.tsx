import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Form, Row, Table, message } from 'antd';
import { NavLink } from 'react-router-dom';
import teacherApi from '../../apis/urlApi';
import { TeacherClassSubjectData, SchoolYearClassData, SchoolYearSubjectResponse } from '../../types/response';
import { YearContext } from '../../context/YearProvider/YearProvider';

const AssignmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const [teacherClassSubject, setTeacherClassSubject] = useState<TeacherClassSubjectData[]>([]);
  const { idYear } = useContext(YearContext);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<SchoolYearClassData[]>([]);
  const [subjects, setSubjects] = useState<SchoolYearSubjectResponse[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (idYear === null) return;
      setIsLoading(true);
      try {
        const res = await teacherApi.getTeacherSchoolYearClassSubject(idYear);
        setTeacherClassSubject(res?.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeachers();
  }, [idYear]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (idYear === null) return;
      setIsLoading(true);
      try {
        const res = await teacherApi.getSchoolYearClass(idYear);
        setClasses(res?.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, [idYear]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (idYear === null) return;
      setIsLoading(true);
      try {
        const res = await teacherApi.getSchoolYearSubject(idYear);
        setSubjects(res?.data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, [idYear]);

  const handleTeacherClick = (teacherId: number) => {
    setSelectedTeacher(String(teacherId));
  };

  const handleClassChange = (classId: number) => {
    setSelectedClass(String(classId));
  };

  const handleSubjectsChange = (subjectIds: number[]) => {
    setSelectedSubjects(subjectIds.map(String));
  };

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      formData['schoolYearId'] = idYear;
      const res = await teacherApi.postTeacherClassSubject(formData);
      message.success('Data submitted successfully!');
    } catch (error: any) {
      if (error.response) console.error('Server Error:', error.response.data);
      else if (error.request) console.error('Network Error:', error.request);
      else console.error('Error:', error.message);
      message.error('Failed to submit data. Please try again later.');
    }
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item className="text-3xl text-black">
          Phân công giảng dạy
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className="flex justify-end mb-4 pr-5">
        <NavLink
          to="/assignment-list"
          className="border-2 border-solid rounded-md mr-3 px-4"
        >
          Quay lại
        </NavLink>
        <Button onClick={handleSubmit} className="px-8 bg-blue text-white">Lưu</Button>
      </Row>
      <Row className='flex'>
        <Col span={8} className="">
          <Table
            dataSource={teacherClassSubject}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleTeacherClick(record.teacherSchoolYear.id),
              style: { cursor: 'pointer' },
            })}
            rowClassName={(record) => (selectedTeacher !== null && record.teacherSchoolYear.id === +selectedTeacher ? 'bg-blue-100' : '')}
          >
            <Table.Column title="Giáo viên" render={(text, record: TeacherClassSubjectData) => (
              <span>{record.teacherSchoolYear.teacher.sortName}</span>
            )} />
          </Table>
        </Col>
        <Col span={8} className="">
          <Table
            dataSource={classes}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleClassChange(record.id),
              style: { cursor: 'pointer' },
            })}
            rowClassName={(record) => (record.id === selectedClass ? 'bg-blue-100' : '')}
          >
            <Table.Column title="Lớp" dataIndex="className" />
          </Table>
        </Col>
        <Col span={8}>
          <Table
            dataSource={subjects}
            rowKey="id"
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys: React.Key[], selectedRows: SchoolYearSubjectResponse[]) => {
                handleSubjectsChange(selectedRowKeys as number[]);
              },
              selectedRowKeys: selectedSubjects,
            }}
          >
            <Table.Column title="Môn học" render={(text, record: SchoolYearSubjectResponse) => (
              <span>{record.subject.name}</span>
            )} />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentForm;
