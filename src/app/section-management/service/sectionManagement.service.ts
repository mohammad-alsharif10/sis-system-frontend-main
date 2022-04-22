import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PageRequest} from '../../shared/model/page-request';
import {PageQueryUtil} from '../../shared/model/page-query';
import {Constants} from '../../shared/constants';
import {Sort} from '@angular/material/sort';
import {MessageResponse} from '../../shared/model/message-response';
import {SectionModel} from '../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../shared/model/section-management/section-request-model';

@Injectable({
  providedIn: 'root'
})
export class SectionManagementService {

  static sectionsList: SectionModel[];
  sectionFilterEvent: Subject<SectionRequestModel> = new Subject<SectionRequestModel>();
  sectionDeleteEvent: Subject<any> = new Subject<any>();
  sectionCloseUpdateEvent: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  public searchSections(
    pageNumber: number, pageSize: number, sectionRequestModel: SectionRequestModel):
    Observable<PageRequest<SectionModel>> {
    console.log(pageNumber, pageSize);
    console.log(sectionRequestModel);
    return this.httpClient.post<PageRequest<SectionModel>>
    (Constants.searchSectionUrl + (pageNumber + 1) + '/' + pageSize, sectionRequestModel);
  }

  constructSectionRequestObject(
    sort: Sort,
    sectionRequestModel: SectionRequestModel): SectionRequestModel {
    if (sort.direction === 'asc') {
      sectionRequestModel.sortDirection = Constants.ASC;
    } else if (sort.direction === 'desc') {
      sectionRequestModel.sortDirection = Constants.DESC;
    } else {
      sectionRequestModel.sortDirection = null;
    }
    sectionRequestModel.sortBy = sort.active;
    return sectionRequestModel;
  }

  save(sectionModel: SectionModel): Observable<SectionModel> {
    console.log(sectionModel);
    return this.httpClient.post<SectionModel>(Constants.saveSectionUrl, sectionModel);
  }

  update(sectionModel: SectionModel): Observable<SectionModel> {
    console.log(sectionModel);
    return this.httpClient.put<SectionModel>(Constants.updateSectionUrl, sectionModel);
  }

  deleteSection(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteSectionUrl + id);
  }

  allSections(): Observable<SectionModel[]>{
    return this.httpClient.get<SectionModel[]>(Constants.allSectionsUrl);
  }

  getSectionsByCourse(courseId: number): SectionModel[] {
    return SectionManagementService.sectionsList.filter(value => {
      return (value.courseDTO?.id === courseId);
    });
  }
}

