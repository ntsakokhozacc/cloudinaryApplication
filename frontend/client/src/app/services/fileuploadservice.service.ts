import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadserviceService {
  private baseApiUrl = 'http://localhost:4000/api/upload';
  private baseApiUrlVid = 'http://localhost:4000/api/upload/video';
  private urlGet = 'http://localhost:4000/api/images';

  constructor(private http: HttpClient) { }

  uploadImage(images: any) {
    return this.http.post(`${this.baseApiUrl}`, images)
  }
  uploadVideo(video:any){
    return this.http.post(`${this.baseApiUrlVid}`,video)
  }


  getImage() {
    return this.http.get(`${this.urlGet}`)
  }


}
