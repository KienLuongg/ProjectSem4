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
  CREATE_SCHOOL_YEAR_SUBJECT_GRADE = '/api/v1/school/creat-school-year-subject-grade',
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
    subjectIds: number[];
    schoolYearId: number;
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
  postCreateSchoolYearSubjectGrade: (payload: {
    gradeId: number;
    schoolYearSubjectId: number;
    number: number;
    sem: string;
  }): Promise<IResponse<any>> => {
    return mainAxios.post(URL.CREATE_SCHOOL_YEAR_SUBJECT_GRADE, payload);
  },
  postCreateSchoolYearClass: (payload: {
    className: string;
    classCode: string;
    gradeId: number;
    roomId: number;
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
    const getSchoolYearId = localStorage.getItem("idYear")
    return mainAxios.get(`${URL.GET_TEACHER_SCHOOL_YEAR}?schoolYearId=${getSchoolYearId}`);
  },
  getSchoolYearSubject: (): Promise<IResponse<any>> => {
    const getSchoolYearId = localStorage.getItem("idYear")
    return mainAxios.get(`${URL.GET_SCHOOL_YEAR_SUBJECT}?schoolYearId=${getSchoolYearId}`);
  },
  getSchoolYearClass: (): Promise<IResponse<any>> => {
    const getSchoolYearId = localStorage.getItem("idYear")
    return mainAxios.get(`${URL.GET_SCHOOL_YEAR_CLASS}?schoolYearId=${getSchoolYearId}`);
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
