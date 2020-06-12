import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubscribeComponent } from './subscribe/subscribe.component';
import { AboutComponent } from './subscribe/about.component';

const routes: Routes = [
    { path: 'home', component: SubscribeComponent },
    { path: 'about', component: AboutComponent },
    { path: '', component: SubscribeComponent }
]
@NgModule ({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutesModule {}