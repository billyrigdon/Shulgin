import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoryService } from 'src/app/services/story.service';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import {  StoryDrug } from 'src/app/types/story';
import { StoryVote } from 'src/app/types/vote';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-story',
	templateUrl: './story.component.html',
	styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
	story: StoryDrug;
	storyId: number;
	userId: number;

	constructor(
		private storyService: StoryService,
		private voteService: VoteService,
		private store: Store<AppState>,
		private route: ActivatedRoute
	) {
		this.story = <StoryDrug>{};
		this.storyId = 0;
		this.userId = 0;
	}

	getStory() {
		this.storyService.getStory(this.storyId).subscribe((res) => {
			this.story = JSON.parse(res);
			this.story.date = formatDate(
				Date.parse(this.story.date),
				'MM/dd/yyyy',
				'en-US'
			);
		});
	}

	upvoteStory(vote: StoryVote) {
		this.voteService.addStoryVote(vote).subscribe((res) => {
			this.story.votes = this.story.votes + 1;
		});
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.storyId = params['storyId'];
			this.getStory();
		});

	}
}
