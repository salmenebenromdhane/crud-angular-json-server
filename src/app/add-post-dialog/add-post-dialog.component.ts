import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialogComponent implements OnInit {
  connectedUser=JSON.parse(localStorage.getItem('connectedUser') || '') 
  postForm: FormGroup;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialogRef<AddPostDialogComponent>,private postService:PostService) { }


  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: ['',Validators.required],
    });
  }

  addPost(){
    const newPost={
      content:this.postForm.value.content,
      user:this.connectedUser,
      createdDate: new Date()
    }
    this.postService.addPost(newPost).subscribe(res=>{},
    err=>{console.log(err);},
    ()=>{
      this.dialog.close(true)
    })

  }


}
