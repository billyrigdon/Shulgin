import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { VoteService } from 'src/app/services/vote.service';
import { StoryComment, NewStoryComment } from 'src/app/types/comment';
import { CommentVote } from 'src/app/types/vote';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
	@Input() storyId!: number;
  parentCommentId: (number | null)
	comments: Array<StoryComment>;

	constructor(
		private commentService: CommentService,
    private voteService: VoteService,
    private router: Router
	) {
    this.comments = [];
    this.parentCommentId = null;
  }
  
  

	upvote(vote: CommentVote) {
		this.voteService.addCommentVote(vote).subscribe((res) => {
			const index = this.comments.findIndex((obj) => {
				return obj.commentId === vote.commentId;
			});
			this.comments[index].votes = this.comments[index].votes + 1;
		});
	}

	removeVote(vote: CommentVote) {
		this.voteService.removeCommentVote(vote).subscribe((res) => {
			const index = this.comments.findIndex((obj) => {
				return obj.commentId === vote.commentId;
			});
			this.comments[index].votes = this.comments[index].votes - 1;
		});
	}

	ngOnInit(): void {
		this.commentService.getComments(this.storyId).subscribe((res) => {
			this.comments = res;
		});
	}
}
