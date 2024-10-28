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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        SidebarComponent,
        OverviewComponent,
        ResumeProfilsComponent,
// meme si sharedModule a ete importe dans CoreModule cela ne va pas double le taille du fichier
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
