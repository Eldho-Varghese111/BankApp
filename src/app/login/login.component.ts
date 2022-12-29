import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  // userDetails:any = {
  //   1000:{acno:1000,usernamme:"Anu",password:123,balance:0},
  //   1001:{acno:1001,usernamme:"Bia",password:123,balance:0},
  //   1002:{acno:1002,usernamme:"Cary",password:123,balance:0}
  // }

  // acnoChange(event:any)
  // {
  //   this.acno = event.target.value
  // }

  // pswChange(event:any)
  // {
  //   this.psw = event.target.value
  // }

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) {

  }

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  login() {
    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    const result = this.ds.login(acno, psw)

    if (this.loginForm.valid) {
      if (result) {
        alert("LOGGED")
        this.router.navigateByUrl('dashboard')
      }
      else {
        alert("Incorrect Account Number or Not Registered")

      }
    }

    else
    {
      alert("INAVLID!!")
    }

  }

  // login(a:any,b:any)
  // {
  //   var acno =a.value
  //   var psw = b.value  
  //   var userDetails = this.userDetails

  //   if(acno in userDetails)
  //   {
  //     if(psw == userDetails[acno]['password'])
  //     {
  //       alert("LOGINED")
  //     }
  //     else
  //     {
  //       alert("Incorrect Password")
  //     }
  //   }
  //   else
  //   {
  //     alert("Incorrect Account Number")
  //   }
  // }
}
