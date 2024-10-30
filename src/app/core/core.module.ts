import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {SharedModule} from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    SharedModule
  ],
  exports :[
    HeaderComponent
  ]
})
export class CoreModule { }
