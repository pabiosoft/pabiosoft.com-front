import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsRoutingModule} from "./posts-routing.module";
import { PostListComponent } from './post-list/post-list.component';
import { RelativeTimePipe } from '../core/pipes/relative-time.pipe';
import { RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ResumeProfilsComponent } from '../pages/resume-profils/resume-profils.component';
import { SidebarDetailComponent } from './post-detail/sidebar-detail/sidebar-detail.component';
import {MenuModule} from "primeng/menu";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {TerminalModule} from "primeng/terminal";



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    SidebarDetailComponent,
    RelativeTimePipe
  ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        RouterModule,
        ResumeProfilsComponent,
        MenuModule,
        Button,
        CardModule,
        TerminalModule,
    ]
})
export class PostsModule { }
