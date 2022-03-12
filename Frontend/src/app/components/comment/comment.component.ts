import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import {
	setParentId,
	toggleAddComment,
} from 'src/app/store/comments/comments.actions';
import { StoryComment } from 'src/app/types/comment';
import { CommentVote } from 'src/app/types/vote';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
	@Input() comment!: StoryComment;
	@Input() comments!: Array<StoryComment>;
	@Input() userId!: number;
	constructor(
		private voteService: VoteService,
		private store: Store<AppState>
	) {}

	upvote(vote: CommentVote) {
		this.voteService.addCommentVote(vote).subscribe((res) => {
			this.comment.votes = this.comment.votes + 1;
		});
	}

	removeVote(vote: CommentVote) {
		this.voteService.removeCommentVote(vote).subscribe((res) => {
			this.comment.votes = this.comment.votes - 1;
		});
	}

	openAddComment(parentCommentId: number) {
		this.store.dispatch(setParentId({ parentId: parentCommentId }));
		this.store.dispatch(toggleAddComment({ open: true }));
	}

	ngOnInit(): void {}
}
