import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { AdminControllers } from './admin-controller';
import { updateAdminValidationSchema } from './admin-validation';

const router = express.Router();

router.get(
  '/',

  AdminControllers.getAllAdmins,
);

router.get(
  '/:id',

  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',

  validationSchemas.validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:adminId',
  
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
