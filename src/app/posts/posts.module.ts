import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsRoutingModule} from "./posts-routing.module";
import { PostListComponent } from './post-list/post-list.component';
import { RelativeTimePipe } from '../core/pipes/relative-time.pipe';



@NgModule({
  declarations: [
    PostListComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
  ]
})
export class PostsModule { }
