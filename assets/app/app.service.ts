import {Injectable} from "@angular/core";

@Injectable() 
export class AppService{

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}