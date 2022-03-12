import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { StoryService } from 'src/app/services/story.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserProfile } from 'src/app/types/user';
import { Story, StoryDrug } from '../../types/story';
import { UserDrug } from 'src/app/types/userDrug';
import { DrugService } from 'src/app/services/drug.service';
import { DatePipe, formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setUserId } from 'src/app/store/shared/actions/shared.actions';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	stories: Array<StoryDrug>;
	userDrugs: Array<UserDrug>;
	userProfile: UserProfile;
	profilePic: string;

	constructor(
		private storyService: StoryService,
		private router: Router,
		private storageService: StorageService,
		private profileService: ProfileService,
		private drugService: DrugService,
		private datepipe: DatePipe,
		private store: Store<AppState>
	) {
		this.stories = Array<StoryDrug>();
		this.userDrugs = Array<UserDrug>();
		this.userProfile = <UserProfile>{};
		this.profilePic = '../../../assets/Icons/avatar-placeholder.png'
	}

	removeUserDrug(drugId: number) {
		this.drugService.removeUserDrug(drugId).subscribe((res) => {
			window.location.reload();
		});
	}

	goToAddStory() {
		this.router.navigateByUrl('addStory');
	}

	goToDrugs() {
		this.router.navigateByUrl('addDrug');
	}

	ngOnInit(): void {
		//Check if logged in and navigate to splash if not
		if (this.storageService.getToken() && this.storageService.getUser()) {
			//TODO: Move userprofile to shared state instead of handling it this way
			if (localStorage.getItem('user')) {
				this.profileService.getProfile().subscribe((res) => {
					this.profileService.setProfile(res)
				})
				//Get user fields from user stored in local storage
				this.userProfile = JSON.parse(
					localStorage.getItem('user') || ''
				);

				//Get stories using userId from local storage
				this.storyService
					.getUserStories(this.userProfile.userId)
					.subscribe((res) => {
						this.stories = JSON.parse(res);
						for (let i = 0; i < this.stories.length; i++) {
							this.stories[i].date = formatDate(
								Date.parse(this.stories[i].date),
								'MM/dd/yyyy',
								'en-US'
							);
						}
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
