import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { StoragePostService } from './storage-post.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url = this.storageService.URL;

  constructor(private http: HttpClient, private storageService: StoragePostService) { }

  getAllGroups() {
    return this.http.get(this.url + "/group/all", httpOptions).pipe();
  }

  getAllGroupsForUser() {
    let user_id = localStorage.getItem("cUserId");
    return this.http.get(this.url + "/group/allForUser/" + user_id, httpOptions).pipe();
  }

  getAllMyGroups() {
    let user = {
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/group/allJoinedGroup", user, httpOptions).pipe();
  }

  joinGroup(group_id) {
    let userGroup = {
      'user_id': localStorage.getItem("cUserId"),
      'group_id': group_id
    }
    return this.http.post(this.url + "/group/joinGroup", userGroup).pipe();
  }

  joinGroupInGroups(group_id) {
    let userGroup = {
      'user_id': localStorage.getItem("cUserId"),
      'group_id': group_id
    }
    return this.http.post(this.url + "/group/joinGroupInGroups", userGroup).pipe();
  }

  leaveGroup(group_id) {
    let userGroup = {
      'user_id': localStorage.getItem("cUserId"),
      'group_id': group_id
    }
    return this.http.post(this.url + "/group/leaveGroup", userGroup).pipe();
  }

  addGroup(file: File, title: string, subTitle, type) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('title', title);
    formData.append('userId', localStorage.getItem("cUserId"));
    formData.append('subTitle', subTitle);
    formData.append('type', type);
    return this.http.post(this.url + "/group/addGroup", formData).pipe();
  }

  addGroupWithoutImage(title: string, subTitle, type) {
    let group = {
      'groupName': title,
      'userId': localStorage.getItem("cUserId"),
      'subTitle': subTitle,
      'type': type
    }
    return this.http.post(this.url + "/group/addGroupWithoutImage", group).pipe();
  }

  deleteGroup(group_id) {
    return this.http.delete(this.url + '/group/deleteGroup/' + group_id).pipe();
  }

  update(group) {
    return this.http.post(this.url + '/group/updateGroup', group).pipe();
  }

  getJoined(userId, group_id) {
    return this.http.get(this.url + '/group/getJoined/' + userId + '/' + group_id).pipe();
  }

  uploadCoverImage(file: File, id) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('id', id);
    return this.http.post(this.url + '/group/uploadCoverImage', formData).pipe();
  }

}
