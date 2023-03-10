import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  userDetails:any
  
  currentuser = ''

  currentacno = ''

  constructor() {

    this.getdetails()
   }

  savedetails()
  {
    if(this.userDetails)
    {
      localStorage.setItem('database',JSON.stringify(this.userDetails))
    }
    if(this.currentuser)
    {
      localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
    }
    if(this.currentacno)
    {
      localStorage.setItem('currentacno',JSON.stringify(this.currentacno))
    }
  }

  getdetails()
  {
    if(localStorage.getItem('database'))
    {
      this.userDetails =JSON.parse(localStorage.getItem('database') || '')
    }
    if(localStorage.getItem('currentacno'))
    {
      this.currentacno =JSON.parse(localStorage.getItem('currentacno') || '')
    }
    if(localStorage.getItem('currentuser'))
    {
      this.currentuser =JSON.parse(localStorage.getItem('currentuser') || '')
    }
  }

  // userDetails:any = {
  //   1000:{acno:1000,usernamme:"Anu",password:123,balance:0,transaction:[]},
  //   1001:{acno:1001,usernamme:"Bia",password:123,balance:0,transaction:[]},
  //   1002:{acno:1002,usernamme:"Cary",password:123,balance:0,transaction:[]}
  // }

  register (acno:any , uname:any , psw:any)
  {
    var userDetails =this.userDetails
    if(acno in userDetails)
    {
      return false
    }
    else
    {
      userDetails[acno] = {acno, username:uname , password:psw,balance:0,transaction:[]}
      this.savedetails()
      return true
    }
  }

  login(acno:any , psw:any)
  {

    var userDetails = this.userDetails

    if(acno in userDetails)
    {
      if(psw == userDetails[acno]['password'])
      {
        this.currentacno = userDetails[acno]['acno'] //store acnt no.

        this.currentuser = userDetails[acno]["username"] //store username
        this.savedetails()
        return true
      }
      else
      {
        return false
      }
    }
    else
    {
      return false

    }
  }

  deposit(acno:any , password:any , amount:any)
  {
    var userDetails = this.userDetails
    var amnt =parseInt(amount)
    if(acno in userDetails)
    {
      if(password == userDetails[acno]["password"])
      {
        userDetails[acno]["balance"] += amnt
        userDetails[acno]['transaction'].push({type:'CREDIT',Amount:amnt})
        this.savedetails()
        return userDetails[acno]["balance"]
      }
      else
      {
        return false
      }
    }
    else
    {
      return false
    }
  }


  withdraw(acno:any ,password:any , amount:any)
  {
    var userDetails = this.userDetails
    var amnt = parseInt(amount)
    if( acno in userDetails)
    {
      if(password == userDetails[acno]["password"])
      {
        if(amnt <= userDetails[acno]["balance"])
        {
          userDetails[acno]["balance"] = userDetails[acno]["balance"] - amnt
          userDetails[acno]['transaction'].push({type:'DEBIT',Amount:amnt})
          this.savedetails()
          return userDetails[acno]["balance"]
        }
        else
        {
          alert("Insufficient Balance")
          return false
        }
      }
      else
      {
        alert("Incorrect Password")
        return false
      }
    }
    else
    {
      alert("Incorrect Account Number")
      return false
    }
  }

  gettransaction(acno:any)
  {
    return this.userDetails[acno]['transaction']
  }

}