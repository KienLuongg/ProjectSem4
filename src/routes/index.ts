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
];

const routes = [...coreRoutes];
export default routes;
