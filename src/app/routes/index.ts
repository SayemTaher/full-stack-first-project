import { Router } from 'express'
import { AcademicDepartmentRoutes } from '../Modules/Academic-Department/academic-department-routes';
import { AcademicFacultyRoues } from '../Modules/Academic-Faculty/academic-faculty-routes';
import { AcademicSemesterRoutes } from '../Modules/Academic-Semester/academic-sem-route';
import { StudentRoutes } from '../Modules/Student/student-route'
import { userRoutes } from '../Modules/User/user-route'

const router = Router()
const routerModules = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semester', // these are second routes
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty', // these are second routes
    route: AcademicFacultyRoues,
  },
  {
    path: '/academic-department', // these are second routes
    route: AcademicDepartmentRoutes,
  },
];
routerModules.forEach(route => router.use(route.path,route.route))
export default router