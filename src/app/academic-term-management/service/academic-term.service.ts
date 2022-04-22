import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AcademicTermModel} from 'src/app/shared/model/academicTerm-management/academic-term-model';
import {AcademicTermRequestModel} from 'src/app/shared/model/academicTerm-management/academic-term-request-model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicTermService {
  static academicTermsList: AcademicTermModel[];
  academicTermFilterEvent: Subject<any> = new Subject<any>();
  academicTermDeleteEvent: Subject<any> = new Subject<any>();
  academicTermSaveEvent: Subject<AcademicTermModel> = new Subject<AcademicTermModel>();
  closeSaveEvent: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
  }

  readonly baseUrl = environment.baseURL + '/academicTerms/delete';


  public postAcademicTerm(academicTerm: AcademicTermModel) {
    return this.http.post(environment.baseURL + '/academicTerms/add', academicTerm);
  }

  deleteAcademicTerm(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  public getAcademicTerms():
    Observable<AcademicTermModel[]> {
    return this.http.get<AcademicTermModel[]>(environment.baseURL + '/academicTerms/all');
  }

  constructAcademicTermRequestObject(academicTermRequestModel: AcademicTermRequestModel): AcademicTermRequestModel {
    return academicTermRequestModel;
  }

  getAcademicTermsByAcademicYears(yearId: number): AcademicTermModel[] {
    return AcademicTermService.academicTermsList.filter(value => {
      return (value.academicYearDTO?.id === yearId);
    });
  }
}
