import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AcademicYear} from 'src/app/shared/model/academicYear-Management/academic-year';
import {MessageResponse} from 'src/app/shared/model/message-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  closeSaveEvent: Subject<any> = new Subject();
  academicYearDeleteEvent: Subject<any> = new Subject<any>();
  academicYearFilterEvent: Subject<any[]> = new Subject<any[]>();


  readonly baseUrl = environment.baseURL + '/api/academicYears/delete';

  constructor(private http: HttpClient) {
  }

// form : FormGroup =new FormGroup({
//   id:new FormControl(''),
//   name:new FormControl(''),
//   code:new FormControl(''),
//   startDate:new FormControl(''),
//   endDate:new FormControl(''),

// })
  postAcademicYear(Academicyear: AcademicYear) {
    return this.http.post(environment.baseURL + '/api/academicYears/add', Academicyear);
  }

//  public postAcademicYear(): Observable<MessageResponse> {
//   return this.http.put<MessageResponse>('http://localhost:8080/api/academicYears/add', this.FormData);
// }
//  putStudent(){
//    return this.http.put(`${this.baseUrl}/${this.FormData.studentId}`,this.FormData);
//   }


  public deleteAcademic(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.baseUrl}/${id}`);
  }


//   refreshlist()  {
//    this.http.get<any>('http://localhost:8080/api/academicYears/all')
//    .toPromise()
//    .then(res => this.list = res as AcademicYear[]);
// }
  public getAcademicYears():
    Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(environment.baseURL + '/api/academicYears/all');
  }

}
