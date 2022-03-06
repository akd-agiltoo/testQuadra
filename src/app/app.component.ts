import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;

  name?: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {}

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getIsLoggedIn() {
    return !!this.tokenStorageService.getToken();
  }

  getName() {
    const user = this.tokenStorageService.getUser();
    return user ? user.name : null;
  }
}
