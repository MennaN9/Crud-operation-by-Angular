import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/users/models/user';
import { ApiService } from 'src/app/users/services/api.service';
import { Router } from '@angular/router';
import { Album } from 'src/app/users/models/album';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
album:Album[]=[];
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id')!;

      this.apiService.getUserById(id).subscribe({next: (user) => {
        this.user = user;
      }, error: (err) => {}});

      this.apiService.getUserAlbums(id).subscribe({next: (album) => {
        this.album = album;
        console.log(album)
      }, error: (err) => {}});
    });

  }
}
