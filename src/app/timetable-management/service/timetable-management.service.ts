import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {PageQueryUtil} from '../../shared/model/page-query';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {TimetableRequestModel} from '../../shared/model/timetable-management/timetable-request-model';
import {TimetableModel} from '../../shared/model/timetable-management/timetable-model';
import {LectureTypeModel} from '../../shared/model/lectureType-model';

@Injectable({
  providedIn: 'root'
})
export class TimetableManagementService {

  timetableAddEvent: Subject<TimetableModel> = new Subject<TimetableModel>();
  timetableUpdateEvent: Subject<TimetableModel> = new Subject<TimetableModel>();
  timetableFilterEvent: Subject<TimetableRequestModel> = new Subject<TimetableRequestModel>();
  timetableDeleteEvent: Subject<any> = new Subject<any>();
  timetableCloseUpdateEvent: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getTimetablesPage(pageNumber: number, pageSize: number): Observable<PageRequest<TimetableModel>> {
    const pageQuery = new PageQueryUtil(pageNumber + 1, pageSize);
    console.log(pageQuery);
    return this.httpClient.post<PageRequest<TimetableModel>>(Constants.timetablePageUrl, pageQuery);
  }

  public filterTimetables(pageNumber: number, pageSize: number, timetableRequestModel: TimetableRequestModel):
    Observable<PageRequest<TimetableModel>> {
    console.log(pageNumber, pageSize);
    return this.httpClient.post<PageRequest<TimetableModel>>
    (Constants.filterTimetableUrl + (pageNumber + 1) + '/' + pageSize, timetableRequestModel);
  }

  constructTimetableRequestObject(sort: Sort, timetableRequestModel: TimetableRequestModel): TimetableRequestModel {
    if (sort.direction === 'asc') {
      timetableRequestModel.sortDirection = Constants.ASC;
    } else if (sort.direction === 'desc') {
      timetableRequestModel.sortDirection = Constants.DESC;
    } else {
      timetableRequestModel.sortDirection = null;
    }
    timetableRequestModel.sortBy = sort.active;
    return timetableRequestModel;
  }

  saveTimetables(timetables: TimetableModel[]): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(Constants.saveTimetableUrl, timetables);
  }

  updateTimetable(timetable: TimetableModel): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(Constants.updateTimetableUrl, timetable);
  }

  deleteTimetable(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteTimetableUrl + id);
  }

  public getAllLectureTypes():
    Observable<LectureTypeModel[]> {
    return this.httpClient.get <LectureTypeModel[]>(Constants.allLectureTypesUrl);
  }

  public getStudentTimetables(studentId: number): Observable<TimetableModel[]> {
    return this.httpClient.get <TimetableModel[]>(Constants.studentTimetablesUrl + studentId);
  }

}
