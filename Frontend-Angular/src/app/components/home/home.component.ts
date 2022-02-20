import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { StoryService } from 'src/app/services/story.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserProfile } from 'src/app/types/user';
import { Story } from '../../types/story';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	stories: Array<Story>;
	userId: number;
	funFact: string;
	username: string;

	constructor(
		private storyService: StoryService,
		private router: Router,
		private tokenStorageService: TokenStorageService,
		private profileService: ProfileService
	) {
		this.stories = [];
		this.userId = 0;
		this.username = '';
		this.funFact = '';
	}


	ngOnInit(): void {
		//Check if logged in and navigate to splash if not
		if (this.tokenStorageService.getToken()) {
			if (localStorage.getItem('user')) {
				//Get user fields from user stored in local storage
				let user = JSON.parse(localStorage.getItem('user') || '');
				this.userId = user.userId;
				this.funFact = user.funFact;
				this.username = user.username;

				//Get stories using userId from local storage
				this.storyService
					.getUserStories(this.userId)
					.subscribe((res) => {
						this.stories = JSON.parse(res);
					});
				//Get Profile if it does not exist in local storage, save it and reload page
			} else {
				this.profileService.getProfile().subscribe((res) => {
					this.profileService.setProfile(res);
					window.location.reload();
				});
			}
		} else {
			this.router.navigateByUrl('/splash');
		}
	}
}
