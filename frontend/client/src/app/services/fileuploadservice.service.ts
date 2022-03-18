import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadserviceService {
  private baseApiUrl = 'http://localhost:3000/api/upload';
  private urlGet = 'http://localhost:4000/api/images';

  constructor(private http: HttpClient) { }

  uploadImage(image: any) {
    return this.http.post(`${this.baseApiUrl}`, image)
  }
  getImage() {
    return this.http.get(`${this.urlGet}`)
  }


}
