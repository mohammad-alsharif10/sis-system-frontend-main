import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {DepartmentRequestModel} from 'src/app/shared/model/department-management/department-request-model';
import {MessageResponse} from 'src/app/shared/model/message-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // FormData : DepartmentModel = new DepartmentModel();

  static departmentsList: DepartmentModel[];
  departmentFilterEvent: Subject<any> = new Subject<any>();
  departmentDeleteEvent: Subject<any> = new Subject<any>();
  departmentSaveEvent: Subject<DepartmentModel> = new Subject<DepartmentModel>();
  closeSaveEvent: Subject<any> = new Subject();
  baseUrl = environment.baseURL + '/api/departments/delete';

  constructor(private httpClient: HttpClient) {
  }

  getDepartmentsByCollege(collegeId: number): DepartmentModel[] {
    return DepartmentService.departmentsList.filter(value => {
      return (value.collegeDTO?.id === collegeId);
    });
  }

//   postDepartment(Department:DepartmentModel){
//     return this.http.post('http://localhost:5000/api/departments/add',this.FormData);
//    }
//    deleteDepartment(id : number){
//     return this.http.delete(`${this.baseUrl}/${id}`);
//    }
//    public getDepartment():
// Observable<DepartmentModel[]> {
// return this.http.get<DepartmentModel[]>('http://localhost:5000/api/departments/all');
// }
// putDepartment(){
//   return this.http.put(`${this.addUrl}/${this.FormData.id}`,this.FormData)
// }
// public getAllColleges():
// Observable<CollegeModel[]> {
// return this.http.get <CollegeModel[]>('http://localhost:5000/api/colleges/all');
// }
  public getDepartments():
    Observable<DepartmentModel[]> {
    return this.httpClient.get<DepartmentModel[]>(environment.baseURL + '/api/departments/all');
  }

  public deleteDepartment(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(`${this.baseUrl}/${id}`);
  }

// public saveClassroom(department: DepartmentModel): Observable<MessageResponse> {
// return this.httpClient.put<MessageResponse>('http://localhost:5000/api/departments/add', department);
// }

  constructClassroomRequestObject(departmentRequestModel: DepartmentRequestModel): DepartmentRequestModel {
    return departmentRequestModel;
  }

  public saveDepartment(department: DepartmentModel) {
    return this.httpClient.post(environment.baseURL + '/api/departments/add', department);
  }
}
