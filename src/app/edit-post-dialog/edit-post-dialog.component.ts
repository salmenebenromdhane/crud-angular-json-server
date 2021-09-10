import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss'],
})
export class EditPostDialogComponent implements OnInit {
  postForm: FormGroup;
  post;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private postService: PostService
  ) {
    this.post = data;
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: [this.post.content, Validators.required],
    });
  }

  editPost() {
    this.post.content = this.postForm.value.content;
    this.postService.editPost(this.post.id, this.post).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      },
      () => {
        this.dialog.close(true);
      }
    );
  }
}
