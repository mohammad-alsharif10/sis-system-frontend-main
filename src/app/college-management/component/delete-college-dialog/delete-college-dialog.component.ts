import {Component, OnInit} from '@angular/core';
import {CollegeManagementService} from '../../service/college-management.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-college-modal',
  templateUrl: './delete-college-dialog.component.html',
  styleUrls: ['./delete-college-dialog.component.css']
})
export class DeleteCollegeDialogComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<DeleteCollegeDialogComponent>,
              private collegeManagementService: CollegeManagementService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteCollege(): void {
    this.collegeManagementService.deleteCollege(this.collegeManagementService.collegeToBeDeleted).subscribe(() => {
      this.handleSuccessfulDeletion();
    }, () => {
      this.handleFailedDeletion();
    });
    this.dialogRef.close();
  }

  private handleSuccessfulDeletion(): void {
    this.collegeManagementService.refreshPageEvent.next();
    this.snackBar.open('College Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('College Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }
}
