import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  filterText: string;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  getName($event) {
    this.filterText = $event;
  }

  createPostPage() {
    this.router.navigate(['blog/createPost']);
  }
}
