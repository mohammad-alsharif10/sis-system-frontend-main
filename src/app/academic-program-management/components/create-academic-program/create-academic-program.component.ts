import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CollegeManagementService} from 'src/app/college-management/service/college-management.service';
import {DepartmentService} from 'src/app/department-management/service/department.service';
import {AcademicProgramModel} from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {AcademicProgramService} from '../../service/academic-program.service';
import {CollegeModel} from '../../../shared/model/college-management/college-model';

@Component({
  selector: 'app-create-academic-program',
  templateUrl: './create-academic-program.component.html',
  styleUrls: ['./create-academic-program.component.css']
})
export class CreateAcademicProgramComponent implements OnInit {
  academicProgramModel: AcademicProgramModel;
  @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;
  @ViewChild('collegeMenu', {static: true}) collegeMenu: MatSelect;
  form: FormGroup;

  errorMessage: string;
  departmentSelectValue: number;
  departments: DepartmentModel[];
  colleges: CollegeModel[] = [];

  constructor(public academicProgramService: AcademicProgramService,
              private breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: AcademicProgramModel,
              private departmentService: DepartmentService,
              private collegeService: CollegeManagementService,
              private snackBar: MatSnackBar,
              private route: Router) {
  }


  add(): void {
    if (this.form.valid) {
      this.academicProgramModel.name_ar = this.form.get('name_ar')?.value;
      this.academicProgramModel.name_en = this.form.get('name_en')?.value;
      this.academicProgramModel.code = this.form.get('code')?.value;
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
      this.academicProgramModel.collegeDTO = new CollegeModel();
      this.academicProgramModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
      this.academicProgramModel.departmentDTO.collegeDTO = this.academicProgramModel.collegeDTO;
      // this.academicProgramModel.departmentDTO.id = 1;
    }
    this.academicProgramService.postAcademicYear(this.academicProgramModel).subscribe((Response) => {
        this.snackBar.open('Academic Program Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.route.navigate(['/academic-programs-management', 'academic-program-list']);
        this.academicProgramService.closeSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Academic Program', undefined, {duration: 2000});
      }
    );
  }

  ngOnInit(): void {
    this.academicProgramModel = new AcademicProgramModel();
// this.academicProgramModel.departmentDTO.collegeDTO=new DepartmentModel();
// this.academicProgramModel.departmentDTO.collegeDTO.id=1;
    this.academicProgramModel.departmentDTO = new DepartmentModel();
    this.academicProgramModel.collegeDTO = new CollegeModel();
    // this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();
    this.form = new FormGroup({
        name_en: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('')])),
        name_ar: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('')])),
        departmentMenu: new FormControl(undefined, Validators.required),
        collegeMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.required),
      }
    );
    this.collegeService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.academicProgramModel = {...this.data};
        this.form.get('name_en')?.setValue(this.academicProgramModel.name_en);
        this.form.get('name_ar')?.setValue(this.academicProgramModel.name_ar);
        this.form.get('code')?.setValue(this.academicProgramModel.code);
        /*if (this.academicProgramModel.departmentDTO === undefined) {
          this.academicProgramModel.departmentDTO = new DepartmentModel();
          // this.academicProgramModel.departmentDTO.collegeDTO = new DepartmentModel();
          this.academicProgramModel.departmentDTO.id = 1;
          this.departmentSelectValue = 0;
        } else {
          // @ts-ignore
          this.departmentSelectValue = this.academicProgramModel.departmentDTO.id;
        }*/
        this.form.get('departmentMenu')?.setValue(this.academicProgramModel.departmentDTO?.id);
        this.form.get('collegeMenu')?.setValue(this.academicProgramModel.collegeDTO?.id);
      }
    });
    console.log('academic Program model', this.academicProgramModel);
  }

  ngAfterViewInit(): void {
    /*this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO.id = value;
      this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();
      console.log('value= ', value);
      this.academicProgramService.academicProgramSaveEvent.next();
    });*/
    this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
      if (this.form.get('collegeMenu')?.value !== undefined) {
        this.departmentMenu.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.form.get('collegeMenu')?.value);
      } else {
        this.form.get('departmentMenu')?.setValue(null);
        this.departmentMenu.setDisabledState(true);
      }
    });

  }

  /*save(): void {
    // console.log('classroom model', this.academicProgramModel);
    // this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();
    // this.academicProgramModel.departmentDTO.collegeDTO.id = 1;
    console.log('academic Program model', this.academicProgramModel);

    this.academicProgramService.postAcademicYear(this.academicProgramModel).subscribe(value => {
      this.academicProgramService.closeSaveEvent.next();
    });
  }*/

  cancel(): void {
    this.academicProgramService.closeSaveEvent.next('Cancel');
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicProgramModel = new AcademicProgramModel();
    } else {
      this.academicProgramModel = {...history.state};
    }
  }
}
