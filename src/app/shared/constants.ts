import {environment} from '../../environments/environment';

export class Constants {
  // College Url
  public static readonly collegePageUrl = environment.baseURL + '/colleges/findAll/';
  public static readonly deleteCollegeUrl = environment.baseURL + '/colleges/deleteCollege/';
  public static readonly saveCollegeUrl = environment.baseURL + '/colleges/add';
  // Building Url
  public static readonly buildingPageUrl = environment.baseURL + '/building/all/';
  public static readonly deleteBuildingUrl = environment.baseURL + '/building/delete/';
  public static readonly saveBuildingUrl = environment.baseURL + '/building/addOrUpdate';
  // Classroom Url
  public static readonly classroomPageUrl = environment.baseURL + '/classroom/all/';
  public static readonly deleteClassroomUrl = environment.baseURL + '/classroom/delete/';
  public static readonly saveClassroomUrl = environment.baseURL + '/classroom/addOrUpdate';
  // Course Url
  public static readonly coursePageUrl = environment.baseURL + '/courses/search/';
  public static readonly saveCourseUrl = environment.baseURL + '/courses/save';
  public static readonly deleteCourseUrl = environment.baseURL + '/courses/delete/';
  public static readonly allCoursesUrl = environment.baseURL + '/courses/all/';
  // Faculty Member Url
  public static readonly facultyMemberPageUrl = environment.baseURL + '/facultyMembers/datapage';
  public static readonly searchFacultyMemberUrl = environment.baseURL + '/facultyMembers/search/';
  public static readonly saveFacultyMemberUrl = environment.baseURL + '/facultyMembers/saveFacultyMember';
  public static readonly deleteFacultyMemberUrl = environment.baseURL + '/facultyMembers/delete/';
  public static readonly uploadFacultyMemberImgUrl = environment.baseURL + '/facultyMembers/upload/';
  public static readonly FacultyMemberImgUrl = environment.baseURL + '/facultyMembers/download/';
  public static readonly allFacultyMembersUrl = environment.baseURL + '/facultyMembers/all';
  public static readonly FacultyMemberDegrees = environment.baseURL + '/degrees/all';
  /* Student Url */
  public static readonly deleteStudentUrl = environment.baseURL + '/students/deleteStudent/';
  public static readonly addStudentUrl = environment.baseURL + '/students/addStudent/';
  public static readonly updateStudentUrl = environment.baseURL + '/students/updateStudent/';
  public static readonly filterStudentUrl = environment.baseURL + '/students/searchStudent/';
  public static readonly uploadStudentImgUrl = environment.baseURL + '/students/upload/';
  public static readonly StudentImgUrl = environment.baseURL + '/students/download/';
  // Section URLs
  public static readonly searchSectionUrl = environment.baseURL + '/sections/search/';
  public static readonly saveSectionUrl = environment.baseURL + '/sections/save';
  public static readonly updateSectionUrl = environment.baseURL + '/sections/update';
  public static readonly deleteSectionUrl = environment.baseURL + '/sections/delete/';
  public static readonly allSectionsUrl = environment.baseURL + '/sections/all/';
  // Timetable URLs
  public static readonly timetablePageUrl = environment.baseURL + '/timetables/datapage';
  public static readonly filterTimetableUrl = environment.baseURL + '/timetables/filter/';
  public static readonly saveTimetableUrl = environment.baseURL + '/timetables/saveAll';
  public static readonly updateTimetableUrl = environment.baseURL + '/timetables/update';
  public static readonly deleteTimetableUrl = environment.baseURL + '/timetables/delete/';
  public static readonly allLectureTypesUrl = environment.baseURL + '/lectureTypes/all';
  public static readonly studentTimetablesUrl = environment.baseURL + '/timetables/getStudentTimetables/';
  // StudentEnrollment URLs
  public static readonly studentEnrollmentPageUrl = environment.baseURL + '/studentEnrollments/datapage';
  public static readonly searchStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/search/';
  public static readonly saveStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/save';
  public static readonly updateStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/update';
  public static readonly deleteStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/delete/';
  public static readonly allMajorsUrl = environment.baseURL + '/majors/all';
  public static readonly allStudyTypesUrl = environment.baseURL + '/studyTypes/all';
  /* Student Attendance Url */
  public static readonly getFacultyMemberSectionsUrl = environment.baseURL + '/sections/getFacultyMemberSections/';
  public static readonly getSectionTimeTablesUrl = environment.baseURL + '/timetables/getSectionTimeTables/';
  public static readonly addLectureUrl = environment.baseURL + '/lectures/addLecture/';
  public static readonly addManualAttendanceUrl = environment.baseURL + '/attendanceDetails/addManualAttendance/';
  public static readonly disableLectureUrl = environment.baseURL + '/lectures/update/';
  public static readonly getAttendancesByLectureUrl = environment.baseURL + '/attendanceDetails/getAttendancesByLecture/';

  // Sort
  public static readonly ASC = 'ASC';
  public static readonly DESC = 'DESC';
  public static readonly sortASCIcon = 'arrow_upward';
  public static readonly sortDESCIcon = 'arrow_downward';
  public static readonly sortASCHint = 'Sort Ascending';
  public static readonly sortDescHint = 'Sort Descending';

  /* Validation Regex */
  public static readonly ENGLISH_CHARACTERS = '^[a-zA-Z ]+$';
  public static readonly ARABIC_CHARACTERS = '^[\\u0621-\\u064A ]+$';
  public static readonly DIGITS_ONLY_14 = '^[0-9]{14}$';
  public static readonly DIGITS_ONLY_11 = '^[01][0-9]{10}$';
  public static readonly FLOAT_NUMBERS = '^([0-9]*[.])?[0-9]+$';
  public static readonly DIGITS_ONLY = '^\\d+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS = '^[a-zA-Z0-9 ]+$';
  public static readonly ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH = '^[a-zA-Z0-9- ]*$';
  public static readonly loginUrl = environment.baseURL + '/security/sign-in';
  public static readonly authHeader = 'Authorization';
  public static readonly loggedInUser = 'loggedInUser';
  public static readonly screens = 'screens';
  static registerUrl = environment.baseURL + '/security/register-student';
  public static readonly ROLE_ADMIN = 'ADMIN';
  public static readonly ROLE_FACULTY_MEMBER = 'FACULTY_MEMBER';
  public static readonly ROLE_STUDENT = 'STUDENT';


}
