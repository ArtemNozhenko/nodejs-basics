import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:id', isValidId, ctrlWrapper(getStudentByIdController));

router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/students/:id', isValidId, ctrlWrapper(deleteStudentController));

router.put(
  '/students/:id',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:id',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
