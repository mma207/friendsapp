import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  baseURL = "http://localhost:8080/friends";

  getAllFriends():Observable<Friend[]>{
    return this.http.get<Friend[]>(this.baseURL).pipe(
      catchError(this.handleError)
    );
  }

  addFriend(friend:Friend):Observable<Friend>{
    return this.http.post<Friend>(this.baseURL, friend).pipe(
      catchError(this.handleError)
    );
  }

  updateFriend(friend:Friend):Observable<Friend>{
    return this.http.put<Friend>(this.baseURL, friend).pipe(
      catchError(this.handleError)
    );
  }

  deleteFriend(friendId:number):Observable<Friend>{
    return this.http.delete<Friend>(`${this.baseURL}/${friendId}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError = (err:any) => {
    console.log(err);
    throw err;
  }

  constructor(private http:HttpClient) { }
}
