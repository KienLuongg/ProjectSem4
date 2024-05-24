
import { FC, LazyExoticComponent, lazy } from 'react'

type LazyComponent = LazyExoticComponent<FC<any>>

interface RouteConfig {
  path: string
  component: LazyComponent
  title: string
  roles: string[]
}

const Attendence = lazy(() => import('../pages/Attendence/Attendence'))
const Students = lazy(() => import('../pages/Students/Student-list'))
const SchoolYears = lazy(() => import('../pages/School-years/School-years'))
const ClassesList = lazy(() => import('../pages/Category/School-year-class'))
const Teachers = lazy(() => import('../pages/Teachers/Teachers'))
const SchoolYearSubject = lazy(() => import('../pages/Category/School-year-subjects'));
const SchoolYearTeacher = lazy(() => import('../pages/Category/Teacher-school-year'));
const SubjectProgram = lazy(() => import('../pages/Category/Subject-program'));
// const Profile = lazy(() => import('../pages/Profile'));
const Schedule = lazy(() => import('../pages/Teaching/Schedules'))
const TeachingAssign = lazy(() => import('../pages/Teaching/Teaching-assignment'))
const AssignmentList = lazy(() => import('../pages/Teaching/Teaching-assign-list'))
const Acknowledge = lazy(() => import('../pages/Acknowledge'))
const Evaluate = lazy(() => import('../pages/Evaluate'))
const tem1 = lazy(() => import('../pages/Teaching/Teaching-assignment2'))
const tem2 = lazy(() => import('../pages/Category/Teacher-School-Year2'))

export const coreRoutes: RouteConfig[] = [
  {
    path: '/students',
    component: Students,
    title: 'Students',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/school-years',
    component: SchoolYears,
    title: 'School Years',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/classes',
    component: ClassesList,
    title: 'Classes',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/teachers',
    component: Teachers,
    title: 'Teachers',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/school-year-subjects',
    component: SchoolYearSubject,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/school-year-teachers',
    component: SchoolYearTeacher,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/subject-program',
    component: SubjectProgram,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/assignment-list',
    component: AssignmentList,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/assignment',
    component: TeachingAssign,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/schedule',
    component: Schedule,
    title: 'Attendance',
    roles: ['ROLE_BGH'],
  },
  {
    path: '/acknowledge',
    component: Acknowledge,
    title: 'Attendance',
    roles: ['ROLE_GV', 'ROLE_BGH'],
  },
  {
    path: '/evaluate',
    component: Evaluate,
    title: 'Attendance',
    roles: ['ROLE_GV', 'ROLE_BGH'],
  },
  {
    path: '/attendence',
    component: Attendence,
    title: 'Attendance',
    roles: ['ROLE_GV', 'ROLE_BGH'],
  }
]
export default coreRoutes
