import mongoose from 'mongoose';
import AppError from '../../CustomError/app-error';
import QueryBuilder from '../../Query-Builder/QueryBuilder';
import { courseSearchableQueries } from './course-constants';
import { TCourse, TCourseFaculty } from './course-interface';
import { Course, CourseFaculty } from './course-model';
import httpStatus from 'http-status';

const createCourseInDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchableQueries)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};
const updateCourseInDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedCourseData = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedCourseData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get course data');
    }
    //check if you need to update any preRequisites course field
    if (preRequisiteCourse && preRequisiteCourse?.length > 0) {
      const deletedPreRequisites = preRequisiteCourse
        ?.filter(data => data.course && data.isDeleted)
        .map(data => data.course);
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete preRequisite course data',
        );
      }
      const newPreRequisite = preRequisiteCourse?.filter(
        data => data.course && !data.isDeleted,
      );
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add new preRequisite course data',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to add new preRequisite course data'
    );
  }
};
const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};
const assignFacultieswithCourseIntoDb = async (id : string,payload : Partial<TCourseFaculty> ) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course : id,
        $addToSet : {faculties : {$each : payload}}
    }, {
        upsert : true, new : true
    })
    return result
}
const removeFacultieswithCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull : {faculties : {$in : payload}}
    },
    {
      new: true,
    },
  );
  return result;
};
export const CourseServices = {
  createCourseInDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
  updateCourseInDb,
  assignFacultieswithCourseIntoDb,
  removeFacultieswithCourseIntoDb,
};
