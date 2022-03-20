import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentService } from 'src/app/services/comment.service';
import { VoteService } from 'src/app/services/vote.service';
import { AppState } from 'src/app/store/app.state';
import {
	setParentCommentContent,
	setParentId,
	setStoryContent,
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
		private store: Store<AppState>,
		private commentService: CommentService
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

	deleteComment(commentId: number) {
		this.commentService.deleteComment(commentId).subscribe((res) => {
			window.location.reload();
		});
	}

	openAddComment(parentCommentId: number) {
		this.store.dispatch(setParentId({ parentId: parentCommentId }));		
		this.store.dispatch(toggleAddComment({ open: true }));
		this.store.dispatch(setParentCommentContent({content: this.comment.content}));
		this.store.dispatch(setStoryContent({content: ""}));
	}

	ngOnInit(): void {}
}
