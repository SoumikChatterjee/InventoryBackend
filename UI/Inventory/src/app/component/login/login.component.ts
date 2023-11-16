import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fg: FormGroup
  constructor(private fb: FormBuilder, private us: UserService) {
    this.fg = fb.group({
      email: '',
      password: ''
    })
  }
  submit() {
    console.log(this.fg.value.email);
    console.log(this.fg.value.password);
    this.us.getUserByEmail(this.fg.value.email,this.fg.value.password).subscribe((res) => {
      alert("Succesfully Login");

    }, (error) => {
      console.log(error);
      
      alert(error.error);

    });
  }
}
