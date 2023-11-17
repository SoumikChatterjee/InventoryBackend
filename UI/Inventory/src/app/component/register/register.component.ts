import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  fg: FormGroup
  constructor(private fb: FormBuilder, private us: UserService,private router:Router) {
    this.fg = fb.group({
      name: '',
      email: '',
      password: '',
      role: ''
    })
  }
  submit() {
    console.log(this.fg.value);
    this.us.getUserByEmail(this.fg.value.email, this.fg.value.password).subscribe((res) => {
      alert("User with same email is present");
    }, (error) => {
      if (error.error === "Email Id not found") {

        //Register new user

        let newUser = {
          id: '',
          name:this.fg.value.name,
          email:this.fg.value.email,
          password:this.fg.value.password,
          role:this.fg.value.role
        }

        this.us.postUser(newUser).subscribe((response) => {
          alert('User added successfully.');
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/']); 
        })

      } else if (error.error === "Password is wrong") {
        alert("User with same email is present");
      } else {
        console.log(error);
        alert("An error occurred");
      }

    });
  }

}
