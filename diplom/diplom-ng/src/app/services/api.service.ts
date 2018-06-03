import { HttpClient } from '@angular/common/http';

export class BaseService {

  constructor (private http: HttpClient){}

  get (url) {
    this.http.get(url).subscribe(data => {
      console.log(data);
    });
  }

  // get (url) {
  //   request = $http({
  //     method: 'get',
  //     url: url,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': 'asd'
  //     }
  //   });
  //
  //   return request;
  // };
  //
  // post (url, data) {
  //   request = $http({
  //     method: 'post',
  //     url: url,
  //     data: data,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authenticate': 'asd'
  //     }
  //   });
  //
  //   return request;
  // };
  //
  // put (url, data) {
  //   request = $http({
  //     method: 'put',
  //     url: url,
  //     data: data,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authenticate': 'asd'
  //     }
  //   });
  //
  //   return request;
  // };
  //
  // del (url, data) {
  //   request = $http({
  //     method: 'delete',
  //     data: data,
  //     url: url,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authenticate': 'asd'
  //     }
  //   });
  //
  //   return request;
  // };
}
