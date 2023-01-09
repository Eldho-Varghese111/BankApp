import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  acno =''

  date:any

  acno1 =''
  psw1 = ''
  amnt1 = ''

  user = ''

  constructor(private ds:DataService , private fb :FormBuilder , private router:Router)
  {
    this.user = this.ds.currentuser

    this.date=new Date()
    
    
  }

  ngOnInit():void
  {
    if(!localStorage.getItem('currentacno'))
    {
      alert("Please Login")
      this.router.navigateByUrl('')
    }
  }

  depositForm = this.fb.group({acno:[''] , psw:[''], amnt:['']})

  deposit(): void
  {
    var acno =this.depositForm.value.acno
    var psw = this.depositForm.value.psw
    var amnt = this.depositForm.value.amnt

    const result = (this.ds.deposit(acno,psw,amnt))
    if(result )
    {
      alert(`${amnt} is credited to your account and your balance is ${result}`)
    }
    else
    {
      alert("Incorrect Password or Account Number")
    }
  }

  withdrawForm = this.fb.group({acno1:[''],psw1:[''],amnt1:['']})

  withdraw()
  {

    var acno1 = this.withdrawForm.value.acno1
    var psw1 = this.withdrawForm.value.psw1
    var amnt1 = this.withdrawForm.value.amnt1

    const result = this.ds.withdraw(acno1 , psw1 , amnt1)

    if(result)
    {
      alert(`${amnt1} amount is debited from your account and your balance is ${result}`)
    }
    
  }

  logout()
  {
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
    this.router.navigateByUrl('')
  }

  deleteconfirm()
  {
    this.acno = JSON.parse( localStorage.getItem('currentacno') || '' ) 
  }

  oncancel()
  {
    this.acno = ''
  }
}
