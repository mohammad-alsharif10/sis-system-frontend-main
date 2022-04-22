import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicProgramManagementRoutingModule } from './academic-program-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AcademicProgramListComponent } from './components/academic-program-list/academic-program-list.component';
import { AcademicProgramParentComponent } from './components/academic-program-parent/academic-program-parent.component';
import { CreateAcademicProgramComponent } from './components/create-academic-program/create-academic-program.component';
import { AcademicProgramService } from './service/academic-program.service';
import { DeleteAcademicProgramComponent } from './components/delete-academic-program/delete-academic-program.component';
import { AcademicProgramFilterComponent } from './components/academic-program-filter/academic-program-filter.component';
import { AcademicProgramPreviewComponent } from './components/academic-program-preview/academic-program-preview.component';


@NgModule({
  declarations: [
    AcademicProgramListComponent,
    AcademicProgramParentComponent,
    CreateAcademicProgramComponent,
    DeleteAcademicProgramComponent,
    AcademicProgramFilterComponent,
    AcademicProgramPreviewComponent
  ],
  imports: [
    CommonModule,
    AcademicProgramManagementRoutingModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
  providers : [AcademicProgramService],
  entryComponents : [CreateAcademicProgramComponent]
})
export class AcademicProgramManagementModule { }
