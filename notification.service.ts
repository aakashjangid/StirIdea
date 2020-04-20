import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoragePostService } from './storage-post.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = this.storageService.URL;

  constructor(private http: HttpClient, private storageService: StoragePostService) { }

  getAllNotifications(cUserId) {
    return this.http.get(this.url + '/notifications/' + cUserId).pipe();
  }

  updateStatus(id) {
    return this.http.get(this.url + '/notifications/updateStatus/' + id).pipe();
  }
}
