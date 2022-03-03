import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { VoteService } from 'src/app/services/vote.service';
import { Story, StoryDrug } from 'src/app/types/story';
import { StoryVote } from 'src/app/types/vote';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
	stories: Array<StoryDrug>;
	constructor(
		private storyService: StoryService,
		private voteService: VoteService
	) {
		this.stories = [];
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
			const index = this.stories.findIndex(obj => {
				return obj.storyId === vote.storyId
			});
			this.stories[index].votes = this.stories[index].votes + 1;
		});
	}

	ngOnInit(): void {
		this.getAllStories();
	}
}
