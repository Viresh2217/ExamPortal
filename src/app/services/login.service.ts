import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

//GetCurrent User
public getCurrentUser() {
  return this.http.get(`${baseUrl}/current-user`);
}


//Generate TOken
public generateToken(loginData: any){
  return this.http.post(`${baseUrl}/generate-token`,loginData)
}

//Login User: Set Token in Local Storage
public loginUser(token: any){
  localStorage.setItem('token',token);
  return true;
}

//isLogin: User is logged in or not   
public isLoggedIn() {
  let tokenStr = localStorage.getItem('token');
  if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
    return false;
  } else {
    return true;
  }
}

// Logout: Remove Token from local storage 

public logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}

// Get token 
public getToken(){
  return localStorage.getItem('token');
}


//Set UserDetails 
public setUser(user: any){
localStorage.setItem('user',JSON.stringify(user));
}

//GetUSer

public getUser(){
let userstr =localStorage.getItem('user');
if(userstr!= null){
  return JSON.parse(userstr);
}else{
  this.logout;
  return null;
}

}

// GetUser Role
public getUserRole(){

  let user=this.getUser()
  return user.authorities[0].authority;
}




}
