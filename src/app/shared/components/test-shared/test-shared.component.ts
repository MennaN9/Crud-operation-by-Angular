import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-test-shared',
  templateUrl: './test-shared.component.html',
  styleUrls: ['./test-shared.component.scss']
})
export class TestSharedComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
}
