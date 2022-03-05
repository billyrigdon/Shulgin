import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugComponent } from './components/add-drug/add-drug.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StoryComponent } from './components/story/story.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'createProfile', component: CreateProfileComponent },
	{ path: 'addDrug', component: AddDrugComponent },
	{ path: 'addStory', component: AddStoryComponent },
	{ path: 'explore', component: ExploreComponent },
	{ path: 'story', component: StoryComponent },
	{ path: '', redirectTo: 'explore', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
