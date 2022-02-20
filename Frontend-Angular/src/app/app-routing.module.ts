import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/register/signup.component';
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'splash', component: SplashComponent},
	{ path: 'home', component: HomeComponent },
	{ path: 'createProfile', component: CreateProfileComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
