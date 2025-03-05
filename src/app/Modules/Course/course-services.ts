import QueryBuilder from "../../Query-Builder/QueryBuilder";
import { courseSearchableQueries } from "./course-constants";
import { TCourse } from "./course-interface";
import { Course } from "./course-model";


const createCourseInDb = async (payload : TCourse) => {
    const result = await Course.create(payload);
    return result

}
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
    const result = await courseQuery.modelQuery
    return result
}
const getSingleCourseFromDb = async (id : string) => {
    const result = await Course.findById(id).populate('preRequisiteCourse.course')
    return result

}
const updateCourseInDb = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...remainingCourseData } = payload;
    
    const updatedCourseData = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedCourseData
}
const deleteCourseFromDb = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {
        isDeleted : true
    }, {
        new : true
    })
    return result
}
export const CourseServices = {
    createCourseInDb,getAllCourseFromDb,getSingleCourseFromDb,deleteCourseFromDb,updateCourseInDb
}