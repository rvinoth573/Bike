import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'https://bikeindex.org:443/api/v3/';
@Injectable({
  providedIn: 'root'
})

export class BikeService {


  constructor(private http: HttpClient) { }

  getBikeList(location: string, distance: number) {
    return this.http.get(`${url}search?per_page=100&location=${location}&distance=${distance}&stolenness=proximity`);
      //https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=IP&distance=10&stolenness=stolen
  }

  stolenCount(location: string, distance: number){
    return this.http.get(`${url}search/count?location=${location}&distance=${distance}&stolenness=proximity`);
   // https://bikeindex.org:443/api/v3/search/count?location=IP&distance=10&stolenness=stolen
  }

}
