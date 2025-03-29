import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { ChatGptService } from '../services/chat-gpt.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  assistantResponse: string = '';
  users: User[] = []; // List of users

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      }
    });
  }

  onSubmit(): void {
    // Attempt to log in the user based on entered credentials.
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === this.credentials.email && u.password === this.credentials.password);
      if (user) {
        if (user.id !== undefined && user.id !== null) {
          localStorage.setItem('userId', user.id.toString());
        }
        this.successMessage = 'Poprawnie zalogowano!';
        this.errorMessage = '';

        // Send a request to ChatGPT
        this.chatGptService.sendMessageToChatGPT('Co to ser szwajcarski?').subscribe({
          next: (response: any) => {
            this.assistantResponse = response.choices[0].message.content;
          },
          error: (error) => {
            if (error.status === 429) {
              this.assistantResponse = 'Przekroczono limit zapytań. Proszę spróbować ponownie później.';
            } else {
              console.error('Błąd podczas komunikacji z ChatGPT:', error);
              this.assistantResponse = 'Niestety, wystąpił problem z połączeniem z asystentem.';
            }
          }
        });

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      } else {
        this.errorMessage = 'Nieprawidłowe dane logowania';
        this.successMessage = '';
      }
    });
  }
}
