import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts: any;
  connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getAllMyPosts(this.connectedUser.id).subscribe(
      (res) => {
        this.posts = JSON.parse(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  openPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  openEditPostDialog(post) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = post;
    const dialogRef = this.dialog.open(EditPostDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  logout() {
    localStorage.removeItem('connectedUser');
    this.router.navigateByUrl('/login');
  }
}
