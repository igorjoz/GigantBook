import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatGptService {
  // URL API OpenAI do komunikacji z modelem GPT
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  // Klucz API OpenAI - zastąp go swoim kluczem
  private apiKey = 'YOUR_OPENAI_API_KEY';

  constructor(private http: HttpClient) {}

  // Metoda do wysyłania wiadomości do ChatGPT i otrzymywania odpowiedzi
  sendMessageToChatGPT(message: string): Observable<any> {

  // Nagłówki HTTP wymagane do autoryzacji i przesyłania JSON
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${this.apiKey}`
  });

  // Treść zapytania do API OpenAI
  const body = {
    model: "gpt-3.5-turbo", // Model GPT-3.5-turbo (można zmienić na inny dostępny model)
    messages: [{ role: "user", content: message }], // Wiadomość użytkownika do wysłania
    max_tokens: 150 // Maksymalna liczba tokenów (słów) w odpowiedzi
    };
    // Wysyłanie zapytania POST do API i zwracanie odpowiedzi jako Observable
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
