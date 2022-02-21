import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoryService } from 'src/app/services/story.service';
import { Story } from 'src/app/types/story';

@Component({
	selector: 'app-add-story',
	templateUrl: './add-story.component.html',
	styleUrls: ['./add-story.component.scss'],
})
export class AddStoryComponent implements OnInit {
	form: FormGroup;
	story: Story;

	constructor(
		private formBuilder: FormBuilder,
		private storyService: StoryService,
		private router: Router
	) {
		this.form = this.formBuilder.group({
			calmness: [1],
			focus: [1],
			creativity: [1],
			mood: [1],
			irritability: [1],
			wakefulness: [1],
			rating: [1],
			journal: ['', Validators.required],
		});
		this.story = {
			calmness: 0,
			creativity: 0,
			focus: 0,
			mood: 0,
			irritability: 0,
			wakefulness: 0,
			rating: 0,
			journal: '',
			userId: 0,
			date: '',
			storyId: 0,
		};
		//Iterable numbers for mood values
	}

	addStory() {
		const val = this.form.value;
		this.story.calmness = parseInt(val.calmness);
		this.story.creativity = parseInt(val.creativity);
		this.story.focus = parseInt(val.focus);
		this.story.mood = parseInt(val.mood);
		this.story.irritability = parseInt(val.irritability);
		this.story.wakefulness = parseInt(val.wakefulness);
		this.story.rating = parseInt(val.rating);
		this.story.journal = val.journal;
		this.storyService.addUserStory(this.story).subscribe((res) => {
			this.router.navigateByUrl('home');
		});
	}

	ngOnInit(): void {
		if (localStorage.getItem('user')) {
			//Get user fields from user stored in local storage
			let user = JSON.parse(localStorage.getItem('user') || '');
			this.story.userId = user.userId;
		} else {
			this.router.navigateByUrl('splash');
		}
	}
}