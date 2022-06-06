import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
username: '',
password: '',
firstName: '',
lastName: '',
email: '',
phone: ''
  };

  constructor(private userService:UserService, private Snack:MatSnackBar) { } 

  ngOnInit(): void {}

  formSubmit(){
console.log(this.user);

if(this.user.username=='' || this.user.username ==null)
{
  this.Snack.open('UserName is Required..!!','', {duration: 2000})
  
  return;
}

   // Adduser
this.userService.addUser(this.user).subscribe(

  (data:any)=>{
    // Sucess
    console.log(data);
   // alert('Sucessfully'); 
    Swal.fire('Successfully Done...!!','User id is'+data.id,'success')
  },
  (error)=>{
    //error 
    console.log(error);
   // alert('Something Went Wrong')
  this.Snack.open('Something went wrong..!!','',{duration:2000})
  
  }

)


  }




}
