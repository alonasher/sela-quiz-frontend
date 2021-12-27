import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  options=['XY Chart' , 'Pie Chart']
  constructor(private router: Router) {}

  redirectToMain() {
    this.router.navigate(['/']);
  }
}
