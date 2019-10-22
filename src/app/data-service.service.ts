import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  /**
   * Pagination get method to fetch all the list of Claims in approver
   */
  getNews(page, roleId) {
    console.log(page, roleId);
    return this.http.get(environment.baseUrl + '/claimProcessing/api/v1/?pageNumber=' + page + '&roleId=' + roleId)

  }
  /**
   * Claim Request Post call
   */

  respForm(reqObj1) {
    console.log(reqObj1);
    return this.http.post(environment.baseUrl + 'claimProcessing/api/v1/', reqObj1)

  }
  /**
   * Register Post call
   */

  register(reqObj) {
    console.log(reqObj);
    return this.http.post(environment.baseUrl + '/claimProcessing/api/v1/claims/', reqObj)
  }
  /**
     * Login post method
     */

  logFrom(login) {
    console.log(login);
    return this.http.post(environment.baseUrl + '/claimProcessing/api/v1/user/', login)
  }

  /**
     * Policy Form Post Call
     */

  // policyForm(policy) {
  //   console.log(policy);
  //   return this.http.post(environment.baseUrl + '/claimProcessing/api/v1/policy/?policyId=', policy)
  // }

}
