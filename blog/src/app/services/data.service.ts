import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  get(id) {
    return this.http.get(this.url + '/api/posts/' + id).pipe();
  }

  getAll() {
    return this.http.get(this.url + '/api/posts').pipe();
  }

  createPost(data) {
    return this.http.post(this.url + '/api/posts/', data).pipe();
  }

}
