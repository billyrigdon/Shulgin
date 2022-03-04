import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
	@Input() storyId!: number;
	@Input() parentCommentId!: (number | null);
	
  constructor() { }

	ngOnInit(): void {}
}
