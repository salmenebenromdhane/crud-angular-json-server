import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  user;
  error=false;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    });
  }

  Login() {
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(res=>{
      this.user=res[0] 
    },
    err=>{console.log(err);
    },
    ()=>{
      if(this.user){
        localStorage.setItem('connectedUser',JSON.stringify(this.user))
        this.router.navigateByUrl('/profile')
      }
      else{
        this.error=true
      }
      

    })
  }
  

}
