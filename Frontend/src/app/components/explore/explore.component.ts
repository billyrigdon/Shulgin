import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { StoryService } from 'src/app/services/story.service';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import { getUserId } from 'src/app/store/shared/selectors/shared.selector';
import { Story, StoryDrug } from 'src/app/types/story';
import { StoryVote } from 'src/app/types/vote';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
	stories: Array<StoryDrug>;
	userId: number;
	constructor(
		private storyService: StoryService,
		private voteService: VoteService,
		private store: Store<AppState>,
		private router: Router,
		private storageService: StorageService,
		private profileService: ProfileService
	) {
		this.stories = [];
		this.userId = 0;
	}

	getAllStories() {
		this.storyService.getAllStories().subscribe((res) => {
			this.stories = JSON.parse(res);
			for (let i = 0; i < this.stories.length; i++) {
				this.stories[i].date = formatDate(
					Date.parse(this.stories[i].date),
					'MM/dd/yyyy',
					'en-US'
				);
			}
		});
	}

	upvoteStory(vote: StoryVote) {
		this.voteService.addStoryVote(vote).subscribe((res) => {
			const index = this.stories.findIndex((obj) => {
				return obj.storyId === vote.storyId;
			});
			this.stories[index].votes = this.stories[index].votes + 1;
		});
	}

	openStory(storyId: number) {
		// this.store.dispatch(setStoryId({ storyId: storyId }));
		this.router.navigateByUrl('story?storyId=' + storyId.toString());
	}

	ngOnInit(): void {
		//Check if logged in and navigate to splash if not
		if (this.storageService.getToken() && this.storageService.getUser()) {
			this.store.select(getUserId).subscribe((val) => {
				this.userId = val;
			});
			this.getAllStories();
		} else {
			this.router.navigateByUrl('/splash');
		}
	}
}
