import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
