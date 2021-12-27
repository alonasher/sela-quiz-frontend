import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  error = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.validatePassword(this.user.password)) {
      this.loginService.login(this.user).subscribe(
        (res: any) => {
          if (res.accessToken) {
            sessionStorage.setItem('accessToken', res.accessToken);
            this.router.navigate(['/']);
          }
        },
        () => (this.error = true)
      );
    } else {
      alert('Wrong details');
    }
  }

  validatePassword(pw: string) {
    return (
      /[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 6 && pw.length <= 20
    );
  }
}
