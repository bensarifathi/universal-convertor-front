import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MediaRequestDto} from "../dto/media-request-dto";
import {MediaResponseDto} from "../dto/media-response-dto";

@Injectable({
  providedIn: 'root'
})
export class ConvertorUploadService {

  private readonly BASE_URL = "https://universal-convertor.techwithfathi.com";
  // private readonly BASE_URL = "http://localhost:8081";


  constructor(private http: HttpClient) {
  }

  uploadMedia(mediaRequestDto: MediaRequestDto) {
    const formData = new FormData();
    formData.set('file', mediaRequestDto.file);
    const params = new HttpParams().set("format", mediaRequestDto.format);
    return this.http.post<MediaResponseDto>(this.BASE_URL + "/api/upload", formData, {params})
  }
}
