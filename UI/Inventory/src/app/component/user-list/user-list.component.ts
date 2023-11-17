import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  constructor(private us:UserService){}
  users:any
  ngOnInit(){   
    this.us.getAllUsers().subscribe((res)=>{
      this.users=res;
      console.log(this.users);
    })    
  }


}
