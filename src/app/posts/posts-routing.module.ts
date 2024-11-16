import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostCodehighlighterComponent } from "./post-codehighlighter/post-codehighlighter.component";
import { FinishedReadingComponent } from "./finished-reading/finished-reading.component";


const routes: Routes = [
    { path: "article/:id", component: PostDetailComponent },
    { path: "", component: PostListComponent },
    {path: "highligh", component: PostCodehighlighterComponent},
    {path: 'finish', component: FinishedReadingComponent}
];


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports :[RouterModule]
})
export class PostsRoutingModule  {}
