import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {CollegeManagementService} from 'src/app/college-management/service/college-management.service';
import {DepartmentService} from 'src/app/department-management/service/department.service';
import {AcademicProgramRequestModel} from 'src/app/shared/model/academicProgram-management/academic-program-request-model';
import {CollegeModel} from 'src/app/shared/model/college-management/college-model';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {AcademicProgramService} from '../../service/academic-program.service';

@Component({
  selector: 'app-academic-program-filter',
  templateUrl: './academic-program-filter.component.html',
  styleUrls: ['./academic-program-filter.component.css']
})
export class AcademicProgramFilterComponent implements OnInit, AfterViewInit {
  academicProgramRequestModel: AcademicProgramRequestModel = new AcademicProgramRequestModel();
  searchValue: string;
  filterCollege: number;
  filterDepartments?: number;
  colleges: CollegeModel[];
  departments: DepartmentModel[];
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;

  constructor(private academicProgramService: AcademicProgramService,
              private departmentService: DepartmentService,
              private collegeService: CollegeManagementService
  ) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    this.collegeService.getClassrooms().subscribe(Response => {
      this.colleges = Response;
      console.log(Response);
    });

    this.departmentService.getDepartments().subscribe(Response => {
      this.departments = Response;
      console.log(Response);
    });
  }

  applyFilter(): void {
    this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, this.filterCollege, this.filterDepartments]);
  }

  resetFilter(): void {
    // this.classroomRequestModel = new ClassroomRequestModel(1, 10);
    this.academicProgramService.academicProgramFilterEvent.next(['', null, null]);
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      console.log(this.collegeSelect.value);
      if (this.collegeSelect.value !== undefined) {

        this.departmentSelect.setDisabledState(false);

      } else {
        this.departmentSelect.setDisabledState(true);
        this.departmentSelect.value = undefined;
        this.filterDepartments = undefined;
      }
      this.filterCollege = value;
      this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, value, this.filterDepartments]);
    });
    this.departmentSelect.valueChange.subscribe(value => {
      this.filterDepartments = value;
      this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, this.filterCollege, value]);
    });
  }
}
