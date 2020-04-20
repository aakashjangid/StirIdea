import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoragePostService } from './storage-post.service';
import { User } from '../user';
import { Post } from '../post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = this.storageService.URL;

  constructor(private http: HttpClient, private storageService: StoragePostService) { }

  getAllPosts(category, type) {
    let user = localStorage.getItem('cUserId')
    return this.http.get(this.url + "/post/all/" + user + "/" + category + "/" + type, httpOptions).pipe();
  }

  getAllPostsForHomePage() {
    let user = localStorage.getItem('cUserId')
    return this.http.get(this.url + "/post/all/" + user, httpOptions).pipe();
  }

  // getAllPostsForPP() {
  //   return this.http.get(this.url + "/post/all", httpOptions).pipe();
  // }

  getImpDatesEvents() {
    return this.http.get(this.url + "/post/impDatesEvents", httpOptions).pipe();
  }

  getAllMyPosts(user_id: number, selectedType: string) {
    return this.http.get(this.url + "/post/myPosts/" + user_id + "/" + selectedType, httpOptions).pipe();
  }

  getAllMyNetworkPosts(user_id: number, selectedType: string) {
    return this.http.get(this.url + "/post/getAllMyNetworkPosts/" + user_id + "/" + selectedType, httpOptions).pipe();
  }

  getUsersPosts(user_id: number, selectedType: string) {
    return this.http.get(this.url + "/post/userPosts/" + user_id + "/" + selectedType, httpOptions).pipe();
  }

  getAllPopularPosts() {
    return this.http.get(this.url + "/post/popularPosts", httpOptions).pipe();
  }

  getAllPopularMyPosts(user_id) {
    return this.http.get(this.url + "/post/myPopularPosts/" + user_id, httpOptions).pipe();
  }

  addPost(file: File, postContent: string, category: any, postType, subCategory) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('title', postContent);
    formData.append('userId', localStorage.getItem("cUserId"));
    formData.append('category', category);
    formData.append('postType', postType);
    formData.append('subCategory', subCategory);
    return this.http.post(this.url + "/post/addPost", formData).pipe();
  }

  addPostForPersonal(file: File, postContent: string, category: any, postType, subCategory, personallySharedBy, userName) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('title', postContent);
    formData.append('userId', localStorage.getItem('cUserId'));
    formData.append('category', category);
    formData.append('postType', postType);
    formData.append('subCategory', subCategory);
    formData.append('personallySharedBy', userName);
    formData.append('personallySharedById', personallySharedBy);
    return this.http.post(this.url + "/post/addPostForPersonal", formData).pipe();
  }

  addPostWithoutImage(postContent: string, category, postType, subCategory) {
    let post = {
      'content': postContent,
      'user_id': localStorage.getItem("cUserId"),
      'category': category,
      'postType': postType,
      'subCategory': subCategory
    }
    return this.http.post(this.url + "/post/addPostWithoutImage", post).pipe();
  }

  addPostWithoutImageForPersonal(postContent: string, category, postType, subCategory, personallySharedBy, userName) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let post = {
      'content': postContent,
      'user_id': localStorage.getItem('cUserId'),
      'category': category,
      'postType': postType,
      'subCategory': subCategory,
      'personallySharedBy': userName,
      'personallySharedById': personallySharedBy
    }
    return this.http.post(this.url + "/post/addPostWithoutImageForPersonal", post).pipe();
  }

  doCommentOnPost(post_id: number, content: string) {
    let comment = {
      'post_id': post_id,
      'content': content,
      'user_id': localStorage.getItem("cUserId"),
    }
    return this.http.post(this.url + "/post/addComment", comment).pipe();
  }

  doLikeOnPost(post_id: number) {
    let like = {
      'post_id': post_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/addLike", like).pipe();
  }

  doUnLikeOnPost(post_id: number) {
    let like = {
      'post_id': post_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/removeLike", like).pipe();
  }

  doLikeOnComment(comment_id: number, post_id: number) {
    let commentsLike = {
      'post_id': post_id,
      'comment_id': comment_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/comment/addLike", commentsLike).pipe();
  }

  doUnLikeOnComment(comment_id: number, post_id: number) {
    let commentsLike = {
      'post_id': post_id,
      'comment_id': comment_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/comment/removeLike", commentsLike).pipe();
  }

  doSharePost(post_id: number, shareContent: string, category: any, postType: string, subCategory: string) {
    let post = {
      'post_id': post_id,
      'user_id': localStorage.getItem("cUserId"),
      'shareContent': shareContent,
      'category': category,
      'postType': postType,
      'subCategory': subCategory
    }
    return this.http.post(this.url + "/post/sharePost", post).pipe();
  }

  doSharePostAsPersonal(post_id: number, shareContent: string, category: any, postType: string,
    subCategory: string, sharedWithUser: number, userName) {
    let user = JSON.parse(localStorage.getItem('user'));
    let post = {
      'post_id': post_id,
      'user_id': localStorage.getItem('cUserId'),
      'shareContent': shareContent,
      'category': category,
      'postType': postType,
      'subCategory': subCategory,
      'personallySharedBy': userName,
      'personallySharedById': sharedWithUser

    }
    return this.http.post(this.url + "/post/sharePostAsPersonal", post).pipe();
  }

  getDataAsPerSubCategory(type, postType, subCategory) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/getDataAsPerSubCategory/' + type + '/' + postType + '/' +
      subCategory + '/' + userId).pipe();
  }

  getDataAsPerPostType(type, postType) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/getDataAsPerPostType/' + type + '/' + postType
      + '/' + userId).pipe();
  }

  deletePost(post_id) {
    return this.http.delete(this.url + '/post/deletePost/' + post_id).pipe();
  }

  getSinglePost(postId) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/getSinglePost/' + postId + '/' + userId).pipe();
  }

  addPostInGroup(file, postContent, groupId) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('title', postContent);
    formData.append('userId', localStorage.getItem("cUserId"));
    formData.append('groupId', groupId);
    return this.http.post(this.url + "/post/addPostInGroup", formData).pipe();
  }

  addPostWithoutImageInGroup(postContent, groupId) {
    let post = {
      'content': postContent,
      'user_id': localStorage.getItem("cUserId"),
      'groupId': groupId
    }
    return this.http.post(this.url + "/post/addPostWithoutImageInGroup", post).pipe();
  }

  getAllPostsOfGroup(groupId) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/getAllPostsOfGroup/' + groupId + '/' + userId).pipe();
  }

  updatePost(post: Post) {
    let editPost = {
      'post_id': post.post_id,
      'content': post.content
    }
    return this.http.post(this.url + '/post/updatePost', editPost).pipe();
  }

  addPostInBlogs(file, postContent, postType) {
    let formData: FormData = new FormData();
    formData.append('file', file, Math.floor(Math.random() * (999999 - 100000)) + 100000 + file.name);
    formData.append('title', postContent);
    formData.append('userId', localStorage.getItem("cUserId"));
    formData.append('postType', postType);
    return this.http.post(this.url + "/post/addPostInBlogs", formData).pipe();
  }

  addPostWithoutImageInBlogs(postContent, postType) {
    let post = {
      'content': postContent,
      'user_id': localStorage.getItem("cUserId"),
      'postType': postType
    }
    return this.http.post(this.url + "/post/addPostWithoutImageInBlogs", post).pipe();
  }

  doLikeOnBlogs(postId) {
    let like = {
      'post_id': postId,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/addLikeOnBlogs", like).pipe();
  }

  doUnLikeOnBlogs(post_id: number) {
    let like = {
      'post_id': post_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/removeLikeOnBlogs", like).pipe();
  }

  doLikeOnCommentOnBlogs(comment_id: number, post_id: number) {
    let commentsLike = {
      'post_id': post_id,
      'comment_id': comment_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/comment/addLikeOnBlogs", commentsLike).pipe();
  }

  doUnLikeOnCommentOnBlogs(comment_id: number, post_id: number) {
    let commentsLike = {
      'post_id': post_id,
      'comment_id': comment_id,
      'user_id': localStorage.getItem("cUserId")
    }
    return this.http.post(this.url + "/post/comment/removeLikeOnBlogs", commentsLike).pipe();
  }

  doCommentOnPostOnBlogs(post_id: number, content: string) {
    let comment = {
      'post_id': post_id,
      'content': content,
      'user_id': localStorage.getItem("cUserId"),
    }
    return this.http.post(this.url + "/post/addCommentOnBlogs", comment).pipe();
  }

  getAllBlogsOfUser(blogDiaryUser, postType) {
    return this.http.get(this.url + '/post/getAllBlogsOfUser/' + postType + '/' + blogDiaryUser).pipe();
  }

  deleteBlogs(post_id) {
    return this.http.delete(this.url + '/post/deleteBlogs/' + post_id).pipe();
  }

  updateBlogs(post: Post) {
    let editPost = {
      'post_id': post.post_id,
      'content': post.content
    }
    return this.http.post(this.url + '/post/updateBlogs', editPost).pipe();
  }

  savePost(post: Post) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/savePost/' + userId + '/' + post.post_id).pipe();
  }

  getSavedPosts(userId) {
    return this.http.get(this.url + '/post/getSavedPosts/' + userId).pipe();
  }

  getAllArchivePosts(type) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/getAllArchivePosts/' + userId + '/' + type).pipe();
  }

  updatePostsView(viewIds) {
    let userId = localStorage.getItem("cUserId");
    return this.http.get(this.url + '/post/updatePostsView/' + userId + '/' + viewIds).pipe();
  }

}
