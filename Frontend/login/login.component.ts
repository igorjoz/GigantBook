import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  successMessage = ''; // Dodaj zmienną na komunikat sukcesu

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === this.credentials.email && u.password === this.credentials.password);
      if (user) {
        // Przechowaj informacje o zalogowanym użytkowniku, np. w lokalnej pamięci
        localStorage.setItem('userId', user.id);
        
        // Wyświetl powiadomienie o sukcesie
        this.successMessage = 'Poprawnie zalogowano!';
        this.errorMessage = ''; // Wyczyść ewentualne poprzednie błędy
        
        // Po krótkim czasie przekieruj na stronę profilu
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000); // Opóźnienie 2 sekundy przed przekierowaniem

      } else {
        this.errorMessage = 'Nieprawidłowe dane logowania';
        this.successMessage = ''; // Wyczyść komunikat sukcesu w przypadku błędu
      }
    });
  }
}
