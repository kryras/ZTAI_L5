import {Component, Input, OnInit} from '@angular/core';
// import {BlogDataService} from "../../../services/blog-data.service";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../services/data.service";


@Component({
  selector: 'app-blog-item-detail',
  templateUrl: './blog-item-detail.component.html',
  styleUrls: ['./blog-item-detail.component.css']
})
export class BlogItemDetailComponent implements OnInit {

  blogPost: Object;
  postId: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get("id");
    });
  }

  ngOnInit() {
    this.dataService.get(this.postId).subscribe(result => {
      this.blogPost = result;
    });
  }

  // }  imageUrl : string;
  // text : string;
  // constructor(private blogData: BlogDataService) { }
  //
  // ngOnInit() {
  //   this.blogData.currentImage.subscribe(image => this.imageUrl = image);
  //   this.blogData.currentText.subscribe(text => this.text = text);
  // }

}
