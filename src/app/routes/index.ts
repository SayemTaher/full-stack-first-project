import { Router } from 'express'
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
        route : AcademicSemesterRoutes
  }
];
routerModules.forEach(route => router.use(route.path,route.route))
export default router