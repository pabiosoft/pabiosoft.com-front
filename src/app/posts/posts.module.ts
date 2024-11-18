import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsRoutingModule} from "./posts-routing.module";
import { PostListComponent } from './post-list/post-list.component';
import { RelativeTimePipe } from '../core/pipes/relative-time.pipe';
import { RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ResumeProfilsComponent } from '../pages/resume-profils/resume-profils.component';
import { SidebarDetailComponent } from './post-detail/sidebar-detail/sidebar-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCodehighlighterComponent } from './post-codehighlighter/post-codehighlighter.component';
import { FinishedReadingComponent } from './finished-reading/finished-reading.component';
import {PostCodeComponent} from "./post-code/post-code.component";
import {PostTexteComponent} from "./post-texte/post-texte.component";
@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    SidebarDetailComponent,
    PostCodehighlighterComponent,
    FinishedReadingComponent,
    RelativeTimePipe,
  ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        RouterModule,
        ResumeProfilsComponent,

        FormsModule,
        ReactiveFormsModule,
        PostCodeComponent,
        PostTexteComponent,
    ]
})
export class PostsModule { }
