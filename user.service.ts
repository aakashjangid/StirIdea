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
export class UserService {

  url = this.storageService.URL;

  constructor(private http: HttpClient, private storageService: StoragePostService) { }

  getAllRecentActiveUsers() {
    let cUserId = localStorage.getItem("cUserId");
    return this.http.get(this.url + "/user/recentActive/" + cUserId, httpOptions).pipe();
  }

  getAllUsersToFollow() {
    let userId = localStorage.getItem('cUserId');
    return this.http.get(this.url + "/user/getAllUsersToFollow/" + userId, httpOptions).pipe();
  }

  getLoggedInUser() {
    let user = {
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/user/getLoggedInUser", user, httpOptions).pipe();
  }

  getUser(user_id) {
    let user = {
      'user_id': user_id
    }
    return this.http.post(this.url + "/user/getLoggedInUser", user, httpOptions).pipe();
  }

  uploadCoverImage(file: File) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('userId', localStorage.getItem("cUserId"))
    return this.http.post(this.url + "/user/uploadCoverImage", formData).pipe();
  }

  uploadProfileImage(file: File) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('userId', localStorage.getItem("cUserId"))
    return this.http.post(this.url + "/user/uploadProfileImage", formData).pipe();
  }

  updatePassword(pwd, newPWD) {
    let changePWD = {
      'pwd': pwd,
      'newPWD': newPWD,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/user/updatePasswordFromSettings", changePWD, httpOptions).pipe();
  }

  getFollowUnfollowInfo(currentUserId, userId) {
    return this.http.get(this.url + "/user/getFollowUnfollowInfo/" + currentUserId + '/' + userId).pipe();
  }

  followUser(loggedInUser, userId) {
    return this.http.get(this.url + '/user/followUser/' + loggedInUser + '/' + userId).pipe();
  }

  unfollowUser(loggedInUser, userId) {
    return this.http.get(this.url + '/user/unfollowUser/' + loggedInUser + '/' + userId).pipe();
  }

  getAllFollowersOfUser(userId) {
    return this.http.get(this.url + "/user/getAllFollowersOfUser/" + userId).pipe();
  }

  getAllFollowingsOfUser(userId) {
    return this.http.get(this.url + "/user/getAllFollowingsOfUser/" + userId).pipe();
  }


  getUserInfo(userId) {
    return this.http.get(this.url + '/user/getUserInfo/' + userId).pipe();
  }

  updateInfo(userInfo) {
    return this.http.post(this.url + '/user/updateInfo', userInfo).pipe();
  }

  sendFeedback(feedback) {
    return this.http.post(this.url + '/user/sendFeedback', feedback).pipe();
  }

  blockUser(userId, cUserId) {
    return this.http.get(this.url + '/user/blockUser/' + cUserId + '/' + userId).pipe();
  }

  getBannerImage(userId, type) {
    return this.http.get(this.url + '/user/getBannerImage/' + userId + '/' + type, { responseType: 'text' }).pipe();
  }

  uploadBannerImage(file, userId, type) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('userId', userId);
    formData.append('type', type);
    return this.http.post(this.url + "/user/uploadBannerImage", formData, { responseType: 'text' }).pipe();
  }

  getUsersWhoLikedPost(postId) {
    return this.http.get(this.url + '/user/getUsersWhoLikedPost/' + postId).pipe();
  }

  getUsersWhoSharedPost(postId) {
    return this.http.get(this.url + '/user/getUsersWhoSharedPost/' + postId).pipe();
  }

  checkForNewNotifications(userId) {
    return this.http.get(this.url + '/user/checkForNewNotifications/' + userId).pipe();
  }

}
