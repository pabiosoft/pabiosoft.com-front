import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostCodehighlighterComponent } from "./post-codehighlighter/post-codehighlighter.component";
import { FinishedReadingComponent } from "./finished-reading/finished-reading.component";
import {PostAddComponent} from "./post-add/post-add.component";


const routes: Routes = [
    { path: "article/:id", component: PostDetailComponent },
    {path: "highligh", component: PostCodehighlighterComponent},
    {path: 'finish', component: FinishedReadingComponent},
    {path: 'add', component: PostAddComponent},
    { path: "", component: PostListComponent },

];


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports :[RouterModule]
})
export class PostsRoutingModule  {}
