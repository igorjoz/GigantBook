import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatGptService } from '../services/chat-gpt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';
  assistantResponse = ''; // Zmienna do przechowywania odpowiedzi od asystenta (ChatGPT)


  constructor(
    private userService: UserService,
    private router: Router,
    private chatGptService: ChatGptService // Serwis do komunikacji z ChatGPT
  ) {}

  onSubmit() {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === this.credentials.email && u.password === this.credentials.password);

      if (user) {
        if (user.id !== undefined && user.id !== null) {
          localStorage.setItem('userId', user.id.toString());
        }

        this.successMessage = 'Poprawnie zalogowano!';
        this.errorMessage = '';

        // Wysyłanie powitalnej wiadomości do asystenta (ChatGPT)
        this.chatGptService.sendMessageToChatGPT('Testowe zapytanie').subscribe({
          next: (response) => {
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

        // setTimeout(() => {
        //   this.router.navigate(['/profile']);
        // }, 2000);
      } else {
        this.errorMessage = 'Nieprawidłowe dane logowania';
        this.successMessage = '';
      }
    });
  }
}
