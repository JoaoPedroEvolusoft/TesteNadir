import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {
  imageUrl: any;
  id = 1;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getById(this.route.snapshot.params['id']).subscribe((data: any) => {
      console.log(data.img.data);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.img.data);
    });
  }
}
