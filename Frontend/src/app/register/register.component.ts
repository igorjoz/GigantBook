import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe({
      next: (createdUser: User) => {
        this.successMessage = 'Rejestracja powiodła się!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Rejestracja nie powiodła się';
        this.successMessage = '';
      }
    });
  }
}
