import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from './features/search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('front');
}
