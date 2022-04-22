import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {Subscription} from 'rxjs';
import {CollegeRequestModel} from '../../../shared/model/college-management/college-request-model';
import {PageRequest} from '../../../shared/model/page-request';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SaveCollegeComponent} from '../save-college/save-college.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-colleges-list',
  templateUrl: './colleges-list.component.html',
  styleUrls: ['./colleges-list.component.css']
})
export class CollegesListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<CollegeModel>;
  collegeRequestModel: CollegeRequestModel = new CollegeRequestModel();
  displayedColumns = ['id', 'nameEn', 'nameAr', 'code', 'Actions'];
  pageIndex = 0;
  defaultPgeSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  collegeModel = new CollegeModel();

  constructor(private collegeManagementService: CollegeManagementService,
              private modalService: BsModalService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions();
  }


  pageChangeEvent(event: PageEvent): void {
    this.collegeManagementService.getCollegePage(event.pageIndex, event.pageSize, this.collegeRequestModel)
      .subscribe(value => {
        this.tableData = value;
      });
  }

  addOrUpdateCollege(college: CollegeModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/colleges-management/create-college', {state: college}).then(_ => console.log());
    } else {
      const initialState = {
        collegeModel: this.collegeModel
      };
      this.modalService.show(SaveCollegeComponent, {initialState});
    }
  }

  sortEvent($event: Sort): void {
    this.collegeRequestModel = this.collegeManagementService.constructCollegeRequestObject($event, this.collegeRequestModel);
    this.collegeManagementService.getCollegePage(0, this.defaultPgeSize, this.collegeRequestModel).subscribe(value => {
      this.tableData = value;
    });
  }

  viewCollege(row: CollegeModel): void {

  }

  deleteCollege(row: CollegeModel): void {
    this.collegeManagementService.collegeToBeDeleted = row.id;
    // this.dialog.open(DeleteCollegeDialogComponent, {width: '450px'});
    this.subscriptionsList.push(this.collegeManagementService.refreshPageEvent.subscribe(_ => {
      this.collegeManagementService
        .getCollegePage(0, this.defaultPgeSize, new CollegeRequestModel())
        .subscribe(value => {
          this.paginator.pageIndex = 0;
          this.tableData = value;
          this.pageIndex = 0;
        });
    }));
  }

  saveCollege(): Subscription {
    return this.collegeManagementService.collegeSaveEvent.subscribe(value => {
      this.collegeManagementService.saveCollege(value).subscribe(data => {
        console.log(data);
      });
    });
  }

  private subscriptions(): Subscription[] {
    this.subscriptionsList.push(this.initialDataSubscription());
    this.subscriptionsList.push(this.filterEventSubscription());
    this.subscriptionsList.push(this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      this.isSmallScreen = value.matches;
    }));
    this.subscriptionsList.push(this.saveCollege());
    return this.subscriptionsList;
  }

  private filterEventSubscription(): Subscription {
    return this.collegeManagementService.collegeFilterEvent
      .subscribe(value => {
        this.collegeRequestModel = value;
        this.paginator.pageIndex = 0;
        this.collegeManagementService
          .getCollegePage(0, this.defaultPgeSize, this.collegeRequestModel)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    return this.collegeManagementService
      .getCollegePage(0, this.defaultPgeSize, this.collegeRequestModel)
      .subscribe(value => {
        this.tableData = value;
        console.log(this.paginator);
      });
  }

}

