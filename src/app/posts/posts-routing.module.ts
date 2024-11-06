import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";



const routes: Routes = [
    { path: "detail/: id", component: PostDetailComponent },
    { path: "", component: PostListComponent },
];


@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports :[RouterModule]
})
export class PostsRoutingModule  {}
