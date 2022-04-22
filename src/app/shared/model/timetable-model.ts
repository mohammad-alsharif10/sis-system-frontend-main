import {BaseModel} from './base-model';
import {AcademicYear} from './academicYear-Management/academic-year';
import {AcademicTermModel} from './academicTerm-management/academic-term-model';
import {FacultyMemberModel} from './facultyMember-management/facultyMember-model';
import {CourseModel} from './course-management/course-model';
import {SectionModel} from './section-model';
import {BuildingModel} from './building-management/building-model';
import {ClassroomModel} from './classroom-management/classroom-model';
import {DepartmentModel} from './department-management/department-model';
import {CollegeModel} from './college-management/college-model';

export class TimetableModel extends BaseModel {
  day: string;
  startTime: string;
  endTime: string;
  lectureTypeDTO: TimetableModel;
  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel;
  academicYearDTO: AcademicYear;
  academicTermDTO: AcademicTermModel;
  facultyMemberDTO: FacultyMemberModel;
  courseDTO: CourseModel;
  sectionDTO: SectionModel;
  buildingDTO: BuildingModel;
  classroomDTO: ClassroomModel;

}
