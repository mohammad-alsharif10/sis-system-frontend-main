import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademicProgramListComponent} from './components/academic-program-list/academic-program-list.component';
import {AcademicProgramParentComponent} from './components/academic-program-parent/academic-program-parent.component';
import {CreateAcademicProgramComponent} from './components/create-academic-program/create-academic-program.component';
import {SecurityGuard} from '../security/service/security.guard';

const routes: Routes = [
  {
    path: '',
    component: AcademicProgramParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'academic-program-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-program-list'
        }
      },
      {
        path: 'academic-program-list',
        component: AcademicProgramListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-program-list'
        }
      },
      {
        path: 'create-academic-program',
        component: CreateAcademicProgramComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-academic-program'
        }
      }
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicProgramManagementRoutingModule {
}
