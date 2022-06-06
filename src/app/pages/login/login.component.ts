import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {
  }
formSubmit(){
  console.log("Btn lgin123123");
  console.log(this.login.getUserRole);
if(this.loginData.username.trim() =='' || this.loginData.username== null){

this.snack.open('user is required..!!','',{
  duration:3000,
});
return;
}


if(this.loginData.password.trim() =='' || this.loginData.password== null){

  this.snack.open('user password is required..!!','',{
    duration:3000,
  });
  return;
  }


// Request to server To generate Token

this.login.generateToken(this.loginData).subscribe((data:any)=>{
  console.log('success');
  console.log('success7878');
  console.log(data);

//LOgin....

 this.login.loginUser(data.token);
this.login.getCurrentUser().subscribe((user:any)=>{
    this.login.setUser(user);
    console.log(user);
//redirect ...ADMIN: admin_dashboard
// redirect ...Normal :normal-dashboard

if (this.login.getUserRole() == 'Admin') {
  //admin dashboard
  window.location.href='/admin';
 
} else if (this.login.getUserRole() == 'Normal') {
  //normal user dashbaord
   window.location.href = '/user-dashboard';
} else {
  this.login.logout();
}





  
});



},
(error)=>{
  console.log('Error');
  console.log(error);

  this.snack.open('Invalid Details !! Try again', '', {
    duration: 3000,
  });
}
);



}
}



