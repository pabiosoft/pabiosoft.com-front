import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { BlogService } from 'src/app/pages/services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finished-reading',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './finished-reading.component.html',
  styleUrl: './finished-reading.component.scss'
})
export class FinishedReadingComponent implements OnInit{
  technologies: any[] = [];
  suggestedBlogs: Blog[] = [];
  currentBlogId: number | any = null;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService 
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['technologies']) {
        this.technologies = JSON.parse(params['technologies']);
      }
      if (params['blogId']) { 
        this.currentBlogId = +params['blogId']; 
      }
      this.getSuggestedBlogs();
    });
  }

  goBack() {
    this.router.navigate(['/blogs/list']); 
  }

  getSuggestedBlogs() {
    if (this.technologies && this.technologies.length > 0) {
      this.blogService.getBlogsByTechnologies(this.technologies).subscribe(blogs => {
        this.suggestedBlogs = blogs.filter(blog => blog.id !== this.currentBlogId);
      });
    }

  }
}