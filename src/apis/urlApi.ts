import { IResponse } from '../types/response';
import mainAxios from './main-axios';

enum URL {
  GET_TEACHER = '/api/v1/teacher/teachers',
  POST_TEACHER = '/api/v1/teacher/add-teacher',
  PUT_TEACHER = '/api/v1/teacher/student',
  DELETE_TEACHER = '//api/v1/teacher/teacher/1',
  CREATE_TEACHER_SCHOOL_YEAR = '/api/v1/school/create-teacher-school-year',
  CREATE_SCHOOL_YEAR_SUBJECT = '/api/v1/school/create-school-year_subject',
  CREATE_SCHOOL_YEAR = '/api/v1/school/create-school-year',
  CREATE_SCHOOL_YEAR_CLASS = '/api/v1/school/create-school-year-class',
  GET_SUBJECTS = '/api/v1/school/subject',
}

const teacherApi = {
  getTeacher: (): Promise<IResponse<any>> => {
    return mainAxios.get(`${URL.GET_TEACHER}`);
  },
  postTeacher: (payload: { slug: string }): Promise<IResponse<any>> => {
    return mainAxios.post(`${URL.POST_TEACHER}?userId=${payload.slug}`);
  },
  putTeacher: (id: number): Promise<IResponse<any>> => {
    return mainAxios.post(`${URL.POST_TEACHER}/${id}`);
  },
  deleteTeacher: (id: number): Promise<IResponse<any>> => {
    return mainAxios.post(`${URL.POST_TEACHER}/${id}`);
  },
  postCreateTeacherSchoolYear: (payload: {
    teacher: number;
    teachers: number[];
    schoolYear: number;
  }): Promise<IResponse<any>> => {
    return mainAxios.post(URL.CREATE_TEACHER_SCHOOL_YEAR, payload);
  },
  postCreateSchoolYearSubject: (payload: {
    subject: number;
    subjects: number[];
    schoolYear: number;
  }): Promise<IResponse<any>> => {
    return mainAxios.post(URL.CREATE_SCHOOL_YEAR_SUBJECT, payload);
  },
  postCreateSchoolYear: (payload: {
    startSem1: string;
    startSem2: string;
    end: string;
  }): Promise<IResponse<any>> => {
    return mainAxios.post(URL.CREATE_SCHOOL_YEAR, payload);
  },

  postCreateSchoolYearClass: (payload: {
    className: string;
    classCode: string;
    grade: number;
    room: number;
    teacherSchoolYear: number;
    schoolYear: number;
  }): Promise<IResponse<any>> => {
    return mainAxios.post(URL.CREATE_SCHOOL_YEAR_CLASS, payload);
  },
  getSubjectById: (id?: number): Promise<IResponse<any>> => {
    const url = id ? `${URL.GET_SUBJECTS}?id=${id}` : URL.GET_SUBJECTS;
    return mainAxios.get(url);
  },
};
export default teacherApi;
