import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Story, StoryDrug } from 'src/app/types/story';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
	stories: Array<StoryDrug>;
	constructor(private storyService: StoryService) {
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

	ngOnInit(): void {
		this.getAllStories();
	}
}
