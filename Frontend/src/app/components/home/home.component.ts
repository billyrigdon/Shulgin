import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { StoryService } from 'src/app/services/story.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserProfile } from 'src/app/types/user';
import { Story } from '../../types/story';
import { UserDrug } from 'src/app/types/userDrug';
import { DrugService } from 'src/app/services/drug.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	stories: Array<Story>;
	userDrugs: Array<UserDrug>;
	userId: number;
	funFact: string;
	username: string;

	constructor(
		private storyService: StoryService,
		private router: Router,
		private storageService: StorageService,
		private profileService: ProfileService,
		private drugService: DrugService
	) {
		this.stories = [];
		this.userDrugs = [];
		this.userId = 0;
		this.username = '';
		this.funFact = '';
	}

	removeUserDrug(drugId: number) {
		this.drugService.removeUserDrug(drugId).subscribe((res) => {
			window.location.reload();
		});
	}

	ngOnInit(): void {
		//Check if logged in and navigate to splash if not
		if (this.storageService.getToken() && this.storageService.getUser()) {
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
				//Get list of drugs that user is taking
				this.drugService.getUserDrugs().subscribe((res) => {
					this.userDrugs = JSON.parse(res);
				});
				//Get Profile if it does not exist in local storage
			} else {
				this.profileService.getProfile().subscribe((res) => {
					this.profileService.setProfile(res);
					//If user profile successfully saved, reload page
					if (localStorage.getItem('user')) {
						window.location.reload();
						//If couldn't get user profile, navigate to createProfile page
					} else {
						this.router.navigateByUrl('/createProfile');
					}
				});
			}
		} else {
			this.router.navigateByUrl('/splash');
		}
	}
}
