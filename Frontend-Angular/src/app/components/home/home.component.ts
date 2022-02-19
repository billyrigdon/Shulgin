import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Story } from '../../types/story';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	stories: Array<Story>;

	constructor(private storyService: StoryService) {
		this.stories = [];
	}

	ngOnInit(): void {
		this.storyService.getUserStories().subscribe((res) => {
			console.log(res);
			this.stories = JSON.parse(res);
			console.log(this.stories);
		});
	}
}
