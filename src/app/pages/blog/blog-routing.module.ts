import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { BlogEditorComponent } from './component/blog-editor/blog-editor.component';
import { BlogDetailComponent } from './component/blog-detail/blog-detail.component';
import { BlogDraftEditorComponent } from './component/blog-draft-editor/blog-draft-editor.component';

const routes: Routes = [
  { path: 'list', component: BlogListComponent },
  { path: 'editor', component: BlogEditorComponent },
  { path: 'editor/:id', component: BlogDraftEditorComponent }, 
  { path: 'blogs/:id', component: BlogDetailComponent }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }