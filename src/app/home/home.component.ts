import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: any;
  connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (res) => {
        this.posts = JSON.parse(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  logout() {
    localStorage.removeItem('connectedUser');
    this.router.navigateByUrl('/login');
  }
}
