import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/component/not-found/not-found.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';


const appRoutes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [
      {
        path: 'colleges-management',
        loadChildren: () => import('./college-management/college-management.module').then(value => value.CollegeManagementModule)
      },
      {
        path: 'departments-management',
        loadChildren: () => import('./department-management/department-management.module').then(value => value.DepartmentManagementModule)
      },
      {
        path: 'students-management',
        loadChildren: () => import('./student-management/student-management.module').then(value => value.StudentManagementModule)
      },
      {
        path: 'buildings-management',
        loadChildren: () => import('./building-management/building-management.module').then(value => value.BuildingManagementModule)
      },
      {
        path: 'classrooms-management',
        loadChildren: () => import('./classroom-management/classroom-management.module').then(value => value.ClassroomManagementModule)
      },
      {
        path: 'courses-management',
        loadChildren: () => import('./course-management/course-management.module').then(value => value.CourseManagementModule)
      },
      {
        path: 'facultyMembers-management',
        loadChildren: () => import('./facultyMember-management/facultyMember-management.module').then(value => value.FacultyMemberManagementModule)
      },
      {
        path: 'academics-year-management',
        loadChildren: () => import('./academic-year-management/academic-year-management.module').then(value => value.AcademicYearManagementModule)
      },
      {
        path: 'academic-programs-management',
        loadChildren: () => import('./academic-program-management/academic-program-management.module').then(value => value.AcademicProgramManagementModule)
      },
      {
        path: 'academics-term-management',
        loadChildren: () => import('./academic-term-management/academic-term.module').then(value => value.AcademicTermModule)
      },
      {
        path: 'student-attendance',
        loadChildren: () => import('./student-attendance/student-attendance.module').then(value => value.StudentAttendanceModule)
      },
      {
        path: 'sections-management',
        loadChildren: () => import('./section-management/section-management.module').then(value => value.SectionManagementModule)
      },
      {
        path: 'timetables-management',
        loadChildren: () => import('./timetable-management/timetable-management.module').then(value => value.TimetableManagementModule)
      },
      {
        path: 'studentEnrollments-management',
        loadChildren: () => import('./studentEnrollment-management/studentEnrollment-management.module').then(value => value.StudentEnrollmentManagementModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
