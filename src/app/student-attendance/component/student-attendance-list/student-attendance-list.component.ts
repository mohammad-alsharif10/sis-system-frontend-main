import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudentAttendanceService} from '../../service/student-attendance.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {Subscription} from 'rxjs';
import {MatCheckbox} from '@angular/material/checkbox';
import {AttendanceDetailsModel} from '../../../shared/model/student-attendance/attendanceDetails-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, } from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-attendance-list',
  templateUrl: './student-attendance-list.component.html',
  styleUrls: ['./student-attendance-list.component.css']
})

export class StudentAttendanceListComponent implements OnInit , AfterViewInit, OnDestroy{

  displayedColumns = ['NO.', 'universityId', 'nameAr', 'attendanceStatus'];
  saveLectureEventSubscription: Subscription;
  dataSource: MatTableDataSource<AttendanceDetailsModel>;
  totalStudents = 0;
  numberOfPresents = 0;
  numberOfAbsents = 0;
  numberOfExcuses = 0;
  presentPercentage = 0;
   disableReport = true;
   spin = false;
  @ViewChild('absentBox') absentBox: MatCheckbox;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('TbSort') TbSort = new MatSort();

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(private studentAttendanceServiceService: StudentAttendanceService, private snackBar: MatSnackBar) {}
  students: StudentModel[];
  tableData: AttendanceDetailsModel[];
  pageIndex = 1;
  defaultPageSize = 10;
  course: CourseModel;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AttendanceDetailsModel>();

    this.dataSource.sort = this.sort;
    this. saveLectureEventSubscription = this.studentAttendanceServiceService.getAttendancesEvent.subscribe(value => {
      this.spin = true;
      this.studentAttendanceServiceService.getAttendancesByLecture(value.id).subscribe(value2 => {
        this.tableData = [];
        this.tableData = value2;
        this.dataSource.data = value2;
        this.attendanceReport();
        this.spin = false;
            });
    });
    this. saveLectureEventSubscription = this.studentAttendanceServiceService.saveLectureEvent.subscribe(value => {

        this.tableData = [];
        this.dataSource.data = this.tableData;
        this.attendanceReport();
        this.spin = true;
        this.studentAttendanceServiceService.getAttendancesByLecture(value.id).subscribe(value2 => {
        this.tableData = value2;
        this.dataSource.data = value2;
        this.attendanceReport();
        this.spin = false;
      });
      }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
      // this.absentBox.change.subscribe(() => {this.absentEnable = !this.absentEnable; });
  }
ngOnDestroy(): void {
    this.saveLectureEventSubscription.unsubscribe();
  }
  ok(): void{

    this.spin = true;
    this.studentAttendanceServiceService.addManualAttendance(this.dataSource.data).subscribe(value => {
       this.tableData = value;
       this.dataSource.data = this.tableData;
       this.attendanceReport();
       this.spin = false;
       this.snackBar.open('Attendance Saved Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'}).afterDismissed().subscribe(value => {

       });

    }, error => {
      this.snackBar.open('Attendance Saving Failed', undefined, {duration: 2000});
      this.spin = false;
    });
  }


 attendanceReport(): void{
    this.disableReport = false;
    this.numberOfExcuses = 0;
    this.numberOfAbsents = 0;
    this.numberOfPresents = 0;
    for (const attendance of this.dataSource.data){
      if (attendance.attendanceStatus === 'Present'){
          this.numberOfPresents++;
      }else if (attendance.attendanceStatus === 'Absent'){
        this.numberOfAbsents++;
      }else if (attendance.attendanceStatus === 'Excuse'){
        this.numberOfExcuses++;
      }
    }
    this.totalStudents = this.dataSource.data.length;
    this.presentPercentage = (this.numberOfPresents / this.totalStudents ) * 100;

 }
}
