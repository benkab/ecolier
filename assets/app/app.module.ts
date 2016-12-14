import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";

import { routing } from "./app.routing";
import { MomentModule } from 'angular2-moment';
import { NavigationComponent } from "./components/includes/navigation/navigation.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { SearchComponent } from "./components/includes/search/search.component";
import { SearchListComponent } from "./components/includes/search/search.list.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { BannerComponent } from "./components/pages/profile/banner/banner.component";
import { MenuComponent } from "./components/pages/profile/menu/menu.component";

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        SearchComponent,
        SearchListComponent,
        ProfileComponent,
        BannerComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MomentModule,
        routing
    ],
    bootstrap: [
        AppComponent
    ],
    providers: []
})
export class AppModule {

}