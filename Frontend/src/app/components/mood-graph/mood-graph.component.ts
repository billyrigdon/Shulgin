import { Component, Input, OnInit } from '@angular/core';
import { MoodService } from 'src/app/services/mood.service';
import { GraphBar } from 'src/app/types/graph';
import { Story, StoryDrug } from 'src/app/types/story';

@Component({
	selector: 'app-mood-graph',
	templateUrl: './mood-graph.component.html',
	styleUrls: ['./mood-graph.component.scss'],
})
export class MoodGraphComponent implements OnInit {
	mood: StoryDrug;
	@Input() userId?: number;
	@Input() storyId?: number;
	moodBars: Array<GraphBar>;
	maxHeight: number;
	constructor(private moodService: MoodService) {
		this.mood = <StoryDrug>{};
		this.moodBars = Array<GraphBar>();
    this.maxHeight = 3;
    this.userId = 0;
    this.storyId = 0;
	}

	buildGraph(mood: StoryDrug) {
		this.moodBars = [
			{
				value: mood.calmness,
				color: '#8195CF',
				size: '',
				legend: 'Calmness',
			},
			{
				value: mood.creativity,
				color: '#00C2A9',
				size: '',
				legend: 'Creativity',
			},
			{
				value: mood.focus,
				color: '#D89959',
				size: '',
				legend: 'Focus',
			},
			{
				value: mood.wakefulness,
				color: '#00A0DF',
				size: '',
				legend: 'Wakefulness',
			},
			{
				value: mood.irritability,
				color: '#FF4d74',
				size: '',
				legend: 'Irritability',
			},
			{
				value: mood.mood,
				color: '#E89DCD',
				size: '',
				legend: 'Mood',
			},
			{
				value: mood.rating,
				color: '#7E6999',
				size: '',
				legend: 'Rating',
			},
		];
		this.moodBars.forEach((bar) => {
			//Get the rem value to determine bar height by multiplying
			//by the max height and dividing by the max value of 10
			bar.size = bar.value + 'rem';
		});
	}

  ngOnInit(): void {
    console.log(this.storyId);
    console.log(this.userId);
		if (this.userId) {
			this.moodService
				.getAverageUserMood(this.userId)
				.subscribe((res) => {
					this.mood = JSON.parse(res);
					this.buildGraph(this.mood);
				});
		} else if (this.storyId != null) {
			this.moodService
				.getAverageStoryMood(this.storyId)
				.subscribe((res) => {
					this.mood = JSON.parse(res);
					this.buildGraph(this.mood);
				});
		}
	}
}
