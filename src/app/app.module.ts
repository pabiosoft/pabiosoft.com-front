import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {SidebarComponent} from "./core/components/sidebar/sidebar.component";
import {OverviewComponent} from "./pages/overview/overview.component";
import {ResumeProfilsComponent} from "./pages/resume-profils/resume-profils.component";
import {FooterComponent} from "./core/components/footer/footer.component";
import {TechnologiesComponent} from "./pages/technologies/technologies.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { Highlight, HighlightModule } from 'ngx-highlightjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { ToastrModule } from 'ngx-toastr';
import {SearchComponent} from "./pages/search-component/search.component";
import {PostsModule} from "./posts/posts.module";
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        SidebarComponent,
        OverviewComponent,
        ResumeProfilsComponent,
        FooterComponent,
        TechnologiesComponent,
        Highlight,
        HighlightModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        ShareButtons,
        ToastrModule.forRoot(),
        SearchComponent,
        PostsModule,
// meme si sharedModule a ete importe dans CoreModule cela ne va pas double le taille du fichier
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
