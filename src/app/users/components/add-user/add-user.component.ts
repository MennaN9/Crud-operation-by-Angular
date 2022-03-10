import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/users/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  //form object

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(){
    // add user form object
    // if form is not valid return
    // if form is valid call api
    // get user data from form value

    const formValue = {}
    this.apiService.addUser({
      "name": "ahmed",
      "username": "ahmed ahmed",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }).subscribe(
      {
        next: (user) => { this.router.navigate(['/users'])},
        error: (err) => {alert('error happened')}
      }
    );
    
  }

}
