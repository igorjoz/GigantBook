import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = []; // Tablica użytkowników

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Pobierz użytkowników przy inicjalizacji komponentu
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      }
    });
  }
}
