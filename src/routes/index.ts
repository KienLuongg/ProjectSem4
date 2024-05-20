import { lazy } from 'react';

const Attendence = lazy(() => import('../pages/Attendence/Attendence'))
const Students = lazy(() => import('../pages/Students/Student-list'));
const SchoolYears = lazy(() => import('../pages/School-years/School-years'));
const Teachers = lazy(() => import('../pages/Teachers/Teachers'));
const NotFound = lazy(() => import('../pages/404page'));
const SchoolYearSubject = lazy(() => import('../pages/Category/School-year-subjects'));
const SchoolYearTeacher = lazy(() => import('../pages/Category/Teacher-school-year'));
const SubjectProgram = lazy(() => import('../pages/Category/Subject-program'));
const SchoolYearClass = lazy(() => import('../pages/Category/School-year-class'));
const Profile = lazy(() => import('../pages/Profile'));
const Schedule = lazy(() => import('../pages/Teaching/Schedules'))
const TeachingAssign = lazy(() => import('../pages/Teaching/Teaching-assignment'))
const AssignmentList = lazy(() => import('../pages/Teaching/Teaching-assign-list'))
const Acknowledge = lazy(() => import('../pages/Acknowledge'))
const Evaluate = lazy(() => import('../pages/Evaluate'))
const tem1 = lazy(() => import('../pages/Teaching/Teaching-assignment2'))
const tem2 = lazy(() => import('../pages/Category/Teacher-School-Year2'))


const coreRoutes = [
  {
    path: '*',
    title: 'NotFound',
    component: NotFound,
  },
  {
    path: '/students',
    title: 'Students',
    component: Students,
  },
  {
    path: '/school-years',
    title: 'School Years',
    component: SchoolYears,
  },
  {
    path: '/teachers',
    title: 'Teachers',
    component: Teachers,
  },
  {
    path: '/attendence',
    title: 'Attendence',
    component: Attendence,
  },
  {
    path: '/school-year-subjects',
    title: 'Subjects',
    component: SchoolYearSubject,
  },
  {
    path: '/school-year-teachers',
    title: 'Teachers',
    component: SchoolYearTeacher,
  },
  {
    path: '/subject-program',
    title: 'Program',
    component: SubjectProgram,
  },
  {
    path: '/school-year-class',
    title: 'Class',
    component: SchoolYearClass,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/schedule',
    title: 'Schedule',
    component: Schedule,
  },
  {
    path: '/assignment',
    title: 'Assignment',
    component: TeachingAssign,
  },
  {
    path: '/assignment-list',
    title: 'Assignment List',
    component: AssignmentList,
  },
  {
    path: '/acknowledge',
    title: 'Acknowledge',
    component: Acknowledge,
  },
  {
    path: '/evaluate',
    title: 'Evaluate',
    component: Evaluate,
  },

  // template
  {
    path: '/1',
    title: '1',
    component: tem1,
  },
  {
    path: '/2',
    title: '2',
    component: tem2,
  },

];

const routes = [...coreRoutes];
export default routes;
