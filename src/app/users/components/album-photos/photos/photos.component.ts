import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/users/services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/users/models/photo';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photo:Photo[]=[];
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('aid')!;

      this.apiService.getAlbumPhotos(id).subscribe({next: (photo) => {
        this.photo = photo;
        console.log(photo)
      }, error: (err) => {}});
    });

}
}
