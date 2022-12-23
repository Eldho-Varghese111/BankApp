import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  acno = ''
  psw = ''

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

  constructor (private router:Router , private ds:DataService)
  {

  }

  login()
  {
    var acno =this.acno
    var psw = this.psw
  
    const result = this.ds.login(acno,psw)

    if(result)
    {
      alert("LOGGED")
      this.router.navigateByUrl('dashboard')
    }
    else
    {
      alert("Incorrect Account Number or Not Registered")

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
