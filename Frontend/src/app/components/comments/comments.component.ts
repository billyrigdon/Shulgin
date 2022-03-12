import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import { toggleAddComment } from 'src/app/store/comments/comments.actions';
import {
	getAddCommentsOpen,
	getParentCommentId,
} from 'src/app/store/comments/comments.selector';
import { StoryComment, NewStoryComment } from 'src/app/types/comment';
import { CommentVote } from 'src/app/types/vote';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
	@Input() storyId!: number;
	parentCommentId: number;
	comments: Array<StoryComment>;
	addCommentOpen: Observable<boolean>;
	userId: number;

	constructor(
		private commentService: CommentService,
		private voteService: VoteService,
		private router: Router,
		private store: Store<AppState>
	) {
		this.comments = [];
		this.parentCommentId = 0;
		this.userId = 0;
		this.addCommentOpen = this.store.select(getAddCommentsOpen);
	}

	ngOnInit(): void {
		this.commentService
			.getComments(this.storyId)
			.subscribe((res: Array<StoryComment>) => {
				this.comments = res.sort((a, b) => b.votes - a.votes);
			});
		if (localStorage.getItem('user')) {
			this.userId = JSON.parse(localStorage.getItem('user') || '').userId;
		}
		//Get parentCommentId from store so that add-comment replies to the correct comment
		//The state is updated by the reply button for comments and stories
		this.store.select(getParentCommentId).subscribe((val) => {
			this.parentCommentId = val;
		});
	}
}
