import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  postData = {
    id: null,
    title: '',
    description: '',
    image: ''
  }

  ngOnInit() {
  }

  createPost(postData) {
    console.log("Utworzenie postu", this.postData);
    this.dataService.createPost(this.postData).subscribe();
    this.router.navigate(['/']);
  }
}
