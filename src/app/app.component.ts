import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DashboardComponent],
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.login().subscribe({
      next: () => console.log('Token отримано!'),
      error: err => console.error(err)
    });
  }
}
