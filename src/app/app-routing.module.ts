import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TechnologiesDetailsComponent } from './pages/technologies-details/technologies-details.component';
import { AuthorComponent } from './pages/author/author.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { FinishedReadingComponent } from './pages/blog/component/finished-reading/finished-reading.component';


const routes: Routes = [ 
  { path: 'blogs', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
  { path: 'posts', loadChildren: () => import ('./posts/posts.module').then(m=>m.PostsModule)},
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { 
    path: '',
    component: HomeComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  { 
    path: 'finished-reading', 
    component: FinishedReadingComponent 
  },
  {
    path: 'technologies',
    component: TechnologiesDetailsComponent
  },
  { 
    path: 'author/:id', 
    component: AuthorComponent 
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
