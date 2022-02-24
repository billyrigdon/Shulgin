import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Story, StoryDrug } from 'src/app/types/story';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
	stories: Array<StoryDrug>
	constructor(private storyService: StoryService) {
		this.stories = []
	}

	getAllStories() {
		this.storyService.getAllStories().subscribe((res) => {
			this.stories = JSON.parse(res)
		})
	}

	ngOnInit(): void {
		this.getAllStories()
	}
}
