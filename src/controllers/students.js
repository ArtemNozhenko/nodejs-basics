import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginatorParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginatorParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const students = await getAllStudents({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${id}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { id } = req.params;
  const student = await deleteStudent(id);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateStudent(id, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a student!',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateStudent(id, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
