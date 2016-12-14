import { Routes, RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";

const APP_ROUTES: Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'profile',
        component : ProfileComponent
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
