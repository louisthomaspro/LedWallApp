import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "./../../services/users.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: String;
  constructor(private userService:UserService, private router:Router) { 
    this.userService.getCurrentUser().subscribe((res)=>{
      console.log('user',res);
      this.currentUser = res;
    })
   }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
     
      let user = JSON.parse(localStorage.getItem("currentUser"));
      console.log(user) 
      this.userService.setCurrentUser(user.name);
    }

    
  }
  
  public isCollapsed = true;
  collapsed = true;
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
     logOut(){
      this.userService.logOut().subscribe((res)=>{
        if(res == "success"){
          this.router.navigate(['/login']);

        }
      } );
     }
}
