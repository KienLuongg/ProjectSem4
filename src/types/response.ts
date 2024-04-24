export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
  total?: number;
  meta?: {
    nextToken: string;
  };
}

export interface TeacherData {
  id: number;
  officerNumber: string;
  joiningDate: string;
  sortName: string;
  active: boolean,
  user: {
    id: number,
    username: string,
    password: string,
    status: null,
    roles: [
      {
        id: number,
        name: string
      }
    ],
    userDetail: {
      id: number,
      firstname: string,
      lastname: string,
      address: string,
      phone: string,
      email: string,
      gender: string,
      birthday: string,
      citizen_id: string,
      nation: null,
      avatar: string
    }
  }
}

export interface SchoolYearsData {
  id: number;
  startSem1: Date;
  startSem2: Date;
  end: Date;
}

export interface SchoolYearTeacherData {
  id: number;
  teacherId: number;
  schoolYearId: number;
}

export interface SchoolYearClassData {
  id: number;
  gradeId: string;
  schoolYearId: string;
  teacherSchoolYearId: string;
  roomId: string;
  className: string;
  classCode: string;
}

export interface SchoolYearSubjectData {
  id: number;
  schoolYearId: string;
  subjectIds: string[];
}

export interface ProgramData {
  id: number;
  schoolYearSubjectId: string;
  gradeId: string;
  number: number;
  sem: string;
}

export interface GradeData {
  id: number;
  name: string;
}

export interface RoomData {
  id: number;
  name: string;
}

export interface Subjects {
  id: number;
  name: string;
  type: string;
  code: string;
}