import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DepartmentService} from 'src/app/department-management/service/department.service';
import {AcademicProgramModel} from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import {CollegeModel} from 'src/app/shared/model/college-management/college-model';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {AcademicProgramService} from '../../service/academic-program.service';

@Component({
  selector: 'app-academic-program-preview',
  templateUrl: './academic-program-preview.component.html',
  styleUrls: ['./academic-program-preview.component.css']
})
export class AcademicProgramPreviewComponent implements OnInit {
  academicProgramModel: AcademicProgramModel;
  departments: DepartmentModel[];
  readOnly: boolean;
  form: FormGroup;
  errorMessage: string;
  @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AcademicProgramModel,
              private academicProgramService: AcademicProgramService,
              private departmentService: DepartmentService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private route: Router) {
  }

  ngOnInit(): void {
    this.academicProgramModel = new AcademicProgramModel();
    this.academicProgramModel.departmentDTO = new DepartmentModel();
    this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();
    this.academicProgramModel.departmentDTO.id = 0;
    this.academicProgramModel.departmentDTO.collegeDTO.id = 0;

    this.form = new FormGroup({
        name_en: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('^[a-zA-Z \\d]+$')])),
        name_ar: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('^[\\u0621-\\u064A \\d]+$')])),
        departmentMenu: new FormControl(undefined, Validators.required),
        // departmentMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.required),
      }
    );
    this.departmentService.getDepartments().subscribe(Response => {
      this.departments = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.academicProgramModel = {...this.data};

        this.form.get('name_ar')?.setValue(this.academicProgramModel.name_ar);
        this.form.get('code')?.setValue(this.academicProgramModel.code);
        this.form.get('name_en')?.setValue(this.academicProgramModel.name_en);
        if (this.academicProgramModel.departmentDTO === undefined) {
          this.academicProgramModel.departmentDTO = new DepartmentModel();
          this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();

        } else {
        }
        this.form.get('departmentMenu')?.setValue(this.academicProgramModel.departmentDTO);
      }
    });
    this.readOnly = true;
    this.form.disable();
    console.log('Academic Program model', this.academicProgramModel);
  }

  add(): void {
    if (this.form.valid) {
      this.academicProgramModel.name_en = this.form.get('name_en')?.value;
      this.academicProgramModel.name_ar = this.form.get('name_ar')?.value;
      this.academicProgramModel.code = this.form.get('code')?.value;
      this.academicProgramModel.departmentDTO = this.form.get('departmentMenu')?.value;
      // this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
      // this.classroomModel.buildingDTO.collegeDTO.id = 1;
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO.id = 1;
    }
    this.academicProgramService.postAcademicYear(this.academicProgramModel).subscribe((Response) => {
        this.snackBar.open('Academic Program Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.route.navigate(['/academics-program-management', 'academic-program-list']);
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

  save(): void {
    console.log('Academic Program model', this.academicProgramModel);
    this.academicProgramModel.departmentDTO = new DepartmentModel();
    this.academicProgramModel.departmentDTO.id = 1;
    this.academicProgramModel.departmentDTO.collegeDTO = new CollegeModel();
    this.academicProgramModel.departmentDTO.collegeDTO.id = 1;
    console.log(this.academicProgramModel.departmentDTO.id);
    this.academicProgramService.postAcademicYear(this.academicProgramModel).subscribe(value => {
      this.academicProgramService.closeSaveEvent.next();
    });
  }

  cancel(): void {
    this.academicProgramService.closeSaveEvent.next('Cancel');
  }

  edit(): void {
    this.readOnly = false;
    this.form.enable();
  }

  ngAfterViewInit(): void {
    this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO = value;
      console.log('value= ', value);
      this.academicProgramService.academicProgramSaveEvent.next();
    });
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicProgramModel = new AcademicProgramModel();
    } else {
      this.academicProgramModel = {...history.state};
    }
  }
}
