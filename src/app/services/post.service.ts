import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  addPost(newPost) {
    return this.http.post(environment.base_url + 'posts', newPost);
  }

  getAllPosts() {
    return this.http.get(environment.base_url + 'posts');
  }

  getAllMyPosts(userId) {
    return this.http.get(environment.base_url + 'posts?user.id=' + userId);
  }

  editPost(postId, body) {
    return this.http.put(environment.base_url + 'posts/' + postId, body);
  }
}
