import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import {LogicielsComponent} from "./pages/logiciels/logiciels.component";

const routes: Routes = [
  { path: 'posts', loadChildren: () => import ('./posts/posts.module').then(m=>m.PostsModule)},
  { path: 'contact', component: ContactPageComponent },
  { path: 'logiciels', component: LogicielsComponent },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
