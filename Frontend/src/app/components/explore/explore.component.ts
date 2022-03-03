import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoryService } from 'src/app/services/story.service';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import { setStoryId } from 'src/app/store/shared/actions/shared.actions';
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
		private router: Router
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
		this.store.dispatch(setStoryId({ storyId: storyId }));
		this.router.navigateByUrl('story');
	}

	ngOnInit(): void {
		this.store.select(getUserId).subscribe((val) => {
			this.userId = val;
		});
		this.getAllStories();
	}
}
