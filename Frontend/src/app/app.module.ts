import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptorProviders } from './guards/auth.interceptor';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddDrugComponent } from './components/add-drug/add-drug.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoadingComponent } from './components/loading/loading.component';
import { appReducer } from './store/app.state';
import { ExploreComponent } from './components/explore/explore.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { StoryComponent } from './components/story/story.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		ProfileComponent,
		CreateProfileComponent,
		NavbarComponent,
		AddDrugComponent,
		AddStoryComponent,
		LoadingComponent,
		ExploreComponent,
		StoryComponent,
		CommentsComponent,
		AddCommentComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		StoreModule.forRoot(appReducer),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		BrowserAnimationsModule,
		MatToolbarModule,
		MatCardModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSelectModule,
	],
	providers: [AuthInterceptorProviders, DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
