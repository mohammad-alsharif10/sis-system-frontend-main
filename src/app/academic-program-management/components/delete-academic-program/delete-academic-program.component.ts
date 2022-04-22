import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AcademicProgramService} from '../../service/academic-program.service';

@Component({
  selector: 'app-delete-academic-program',
  templateUrl: './delete-academic-program.component.html',
  styleUrls: ['./delete-academic-program.component.css']
})
export class DeleteAcademicProgramComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAcademicProgramComponent>,
              private academicProgramService: AcademicProgramService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteClassroom(): void {
    this.academicProgramService.academicProgramDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
