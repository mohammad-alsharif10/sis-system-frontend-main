import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StudentRequestModel} from '../../shared/model/student-management/student-request-model';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';

export class UpdatePreviewData {
  st: StudentModel;
  sel: number;
}
@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  studentFilterEvent: Subject<StudentRequestModel> = new Subject<StudentRequestModel>();
  studentDeleteEvent: Subject<number> = new Subject<number>();
  studentCloseUpdateEvent: Subject<any> = new Subject<any>();
  studentCloseAddEvent: Subject<any> = new Subject<any>();




  constructor(private httpClient: HttpClient) { }

  searchStudents( page: number, limit: number, filter: StudentRequestModel): Observable<PageRequest<StudentModel>>{

   page++;
   return this.httpClient.post<PageRequest<StudentModel>>(Constants.filterStudentUrl , filter, {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });

  }

  constructStudentRequestObject(sort: Sort, studentRequestModel: StudentRequestModel): StudentRequestModel {
    if (sort.direction === 'asc') {
      studentRequestModel.sortDirection = Constants.ASC;
    } else if (sort.direction === 'desc') {
      studentRequestModel.sortDirection = Constants.DESC;
    } else {
      studentRequestModel.sortDirection = null;
    }
    studentRequestModel.sortBy = sort.active;
    return studentRequestModel;
  }

  addStudent(student: StudentModel): Observable < MessageResponse > {
    return this.httpClient.post<MessageResponse>(Constants.addStudentUrl, student);
  }
updateStudent(student: StudentModel): Observable < MessageResponse > {

  return this.httpClient.put<MessageResponse>(Constants.updateStudentUrl, student);

  }

  deleteStudent(id: number): Observable<MessageResponse> {

    return this.httpClient.delete<MessageResponse>(Constants.deleteStudentUrl + id);
  }

  upload(selectedFile: File, name: string): Observable<string[]> {
    const uploadImageData = new FormData();
    uploadImageData.append('files', selectedFile, name);
    return this.httpClient.post<string[]>(Constants.uploadStudentImgUrl, uploadImageData, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

}

