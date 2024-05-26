import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {switchMap, takeWhile, timer} from "rxjs";
import {TaskResponseDto} from "../dto/task-response-dto";

@Injectable({
  providedIn: 'root'
})
export class ConvertorTrackerService {

  private readonly BASE_URL = "https://universal-convertor.techwithfathi.com";
  // private readonly BASE_URL = "http://localhost:8081";



  constructor(private http: HttpClient) { }

  getTaskStatus(taskId: string) {
    return timer(0, 2000).pipe(
      switchMap(() => this.http.get<TaskResponseDto>(`${this.BASE_URL}/api/convertor/${taskId}`)),
      takeWhile(response => response.status !== 'DONE', true)
    );
  }
}
