import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {AcademicProgramModel} from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import {AcademicProgramService} from '../../service/academic-program.service';
import {AcademicProgramPreviewComponent} from '../academic-program-preview/academic-program-preview.component';
import {CreateAcademicProgramComponent} from '../create-academic-program/create-academic-program.component';
import {DeleteAcademicProgramComponent} from '../delete-academic-program/delete-academic-program.component';

@Component({
  selector: 'app-academic-program-list',
  templateUrl: './academic-program-list.component.html',
  styleUrls: ['./academic-program-list.component.css']
})
export class AcademicProgramListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableData: AcademicProgramModel[];
  displayedColumns = ['id', 'code', 'name_ar', 'name_en', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  academicProgramModel = new AcademicProgramModel();
  searchValue: string;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }


  constructor(private dialog: MatDialog, public service: AcademicProgramService,
              private modalService: BsModalService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.subscriptions();
  }

  addOrUpdateAcademicProgram(academicProgram: AcademicProgramModel): void {
    if (this.isSmallScreen) {
      console.log('close event 1');
      this.router.navigateByUrl('/academic-programs-management/create-academicProgram', {state: academicProgram}).then(_ => console.log());
    } else {
      this.dialog.open(CreateAcademicProgramComponent, {data: academicProgram});
      this.service.closeSaveEvent.subscribe(e => {
        console.log('close event 2');
        this.dialog.closeAll();
        if (e !== 'Cancel') {
          this.snackBar.open('Academic Program Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.service.getAcademicPrograms().subscribe(data => {
            this.tableData = data;
            this.dataSource.data = this.tableData;
            AcademicProgramService.academicProgramsList = this.tableData;
          });
        }
      }, error => {
        this.snackBar.open('Academic Program Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  viewAcademicProgram(academicProgram: AcademicProgramModel): void {
    this.dialog.open(AcademicProgramPreviewComponent, {data: academicProgram});
    this.service.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();
    }, error => {
      this.snackBar.open('Academic Program Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
    });
  }

  deleteAcademicProgram(row: AcademicProgramModel): void {
    this.dialog.open(DeleteAcademicProgramComponent, {width: '450px'});
    this.subscriptionsList.push(this.service.academicProgramDeleteEvent.subscribe(_ => {
      this.service.deleteAcademicProgram(row.id).subscribe(() => {
        this.handleSuccessfulDeletion();
      }, () => {
        this.handleFailedDeletion();
      });
    }));
  }

  private subscriptions(): Subscription[] {
    this.subscriptionsList.push(this.initialDataSubscription());
    this.subscriptionsList.push(this.filterEventSubscription());
    this.subscriptionsList.push(this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      this.isSmallScreen = value.matches;
    }));
    return this.subscriptionsList;
  }

  private filterEventSubscription(): Subscription {
    return this.service.academicProgramFilterEvent
      .subscribe(list => {
        if (list[1] === null) {
          this.pageIndex = 1;
          this.dataSource.filter = list[0].trim().toLowerCase();
        } else {
          this.service.getAcademicPrograms().subscribe(AcademicPrograms => {
            this.tableData = AcademicPrograms;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.dataSource.filter = list[0].trim().toLowerCase();
            if (list[1] !== undefined) {
              this.dataSource.data = this.dataSource.data.filter(value1 => {
                return (value1.departmentDTO.collegeDTO.id === list[1]);
              });
              if (list[2] !== undefined) {
                this.dataSource.data = this.dataSource.data.filter(value1 => {
                  return (value1.departmentDTO.id === list[2]);
                });
              }
            }
          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.service
      .getAcademicPrograms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicProgramService.academicProgramsList = this.tableData;

      });
  }

  private handleSuccessfulDeletion(): void {
    this.service
      .getAcademicPrograms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicProgramService.academicProgramsList = this.tableData;

      });
    this.snackBar.open('Academic Program Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Academic Program Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }
}
