import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {SharedModule} from "../shared/shared.module";
import {MenubarModule} from "primeng/menubar";
import {Ripple} from "primeng/ripple";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {ChipsModule} from "primeng/chips";


@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MenubarModule,
        Ripple,
        BadgeModule,
        AvatarModule,
        ChipsModule
    ],
  exports :[
    HeaderComponent
  ]
})
export class CoreModule { }
