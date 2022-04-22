import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AcademicProgramRequestModel} from 'src/app/shared/model/academicProgram-management/academic-program-request-model';
import {AcademicProgramModel} from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicProgramService {
  constructor(private http: HttpClient) {
  }

  static academicProgramsList: AcademicProgramModel[];
  // FormData : AcademicProgramModel = new AcademicProgramModel();
  list: AcademicProgramModel[] = [];
  academicProgramFilterEvent: Subject<any[]> = new Subject<any[]>();
  academicProgramDeleteEvent: Subject<any> = new Subject<any>();
  academicProgramSaveEvent: Subject<AcademicProgramModel> = new Subject<AcademicProgramModel>();
  closeSaveEvent: Subject<any> = new Subject();
  baseUrl = environment.baseURL + 'api/academicPrograms/delete';

  postAcademicYear(academicProgram: AcademicProgramModel) {
    return this.http.post(environment.baseURL + '/api/academicPrograms/add', academicProgram);
  }

  deleteAcademicProgram(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  public getAcademicPrograms():
    Observable<AcademicProgramModel[]> {
    return this.http.get<AcademicProgramModel[]>(environment.baseURL + '/api/academicPrograms/all');
  }

  // public saveClassroom(academicProgram:AcademicProgramModel){
  //   return this.http.post('http://localhost:8080/api/academicPrograms/add',academicProgram);
  //  }
  constructClassroomRequestObject(academicProgramRequestModel: AcademicProgramRequestModel): AcademicProgramRequestModel {
    return academicProgramRequestModel;
  }


  getAcademicProgramsByDepartment(departmentId: number): AcademicProgramModel[] {
    return AcademicProgramService.academicProgramsList.filter(value => {
      return (value.departmentDTO?.id === departmentId);
    });
  }

}
