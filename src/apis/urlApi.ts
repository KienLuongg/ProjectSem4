import { IResponse } from '../types/response';
import mainAxios from './main-axios';

enum URL {
  GET_TEACHER = '/api/v1/teacher',
  POST_TEACHER = '/api/v1/teacher',
  PUT_TEACHER = '/api/v1/teacher',
  DELETE_TEACHER = '//api/v1/teacher',
  CREATE_TEACHER_SCHOOL_YEAR = '/api/v1/school/creat-teacher-school-year',
  CREATE_SCHOOL_YEAR_SUBJECT = '/api/v1/school/creat-school-year_subject',
  CREATE_SCHOOL_YEAR = '/api/v1/school/creat-school-year',
  CREATE_SCHOOL_YEAR_CLASS = '/api/v1/school/creat-school-year-class',
  GET_TEACHER_SCHOOL_YEAR = '/api/v1/school/teacher-school-year',
  GET_SCHOOL_YEAR_SUBJECT = '/api/v1/school/school-year-subject',
  GET_SCHOOL_YEAR = '/api/v1/school/school-year',
  GET_SCHOOL_YEAR_CLASS = '/api/v1/school/school-year-class',
  GET_SUBJECTS = '/api/v1/school/subject',
  GET_GRADES = '/api/v1/school/get-grades',
  GET_ROOMS = '/api/v1/school/get-rooms',
}

const teacherApi = {
  getTeacher: (): Promise<IResponse<any>> => {
    return mainAxios.get(`${URL.GET_TEACHER}`);
  },
  getTeacherById: (id: number): Promise<IResponse<any>> => {
    return mainAxios.get(`${URL.GET_TEACHER}/${id}`);
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
  getSchoolYear: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_SCHOOL_YEAR);
  },
  getSchoolYearById: (id: number): Promise<IResponse<any>> => {
    return mainAxios.get(`${URL.GET_SCHOOL_YEAR}/${id}`);
  },
  getTeacherSchoolYear: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_TEACHER_SCHOOL_YEAR);
  },
  getSchoolYearSubject: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_SCHOOL_YEAR_SUBJECT);
  },
  getSchoolYearClass: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_SCHOOL_YEAR_CLASS);
  },
  getGrades: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_GRADES);
  },
  getRooms: (): Promise<IResponse<any>> => {
    return mainAxios.get(URL.GET_ROOMS);
  },
  getSubjectById: (id?: number): Promise<IResponse<any>> => {
    const url = id ? `${URL.GET_SUBJECTS}?id=${id}` : URL.GET_SUBJECTS;
    return mainAxios.get(url);
  },
};
export default teacherApi;
