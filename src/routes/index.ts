import { lazy } from 'react';

const Students = lazy(() => import('../pages/Students/Student-list'));
const SchoolYears = lazy(() => import('../pages/School-years/School-years'));
const ClassesList = lazy(() => import('../pages/Classes/Classes-list'));
const Teachers = lazy(() => import('../pages/Teachers/Teachers'))
const NotFound = lazy(() => import('../pages/404page'));


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
    path: '/classes',
    title: 'Classes',
    component: ClassesList,
  },
  {
    path: '/teachers',
    title: 'Teachers',
    component: Teachers,
  },
];

const routes = [...coreRoutes];
export default routes;
