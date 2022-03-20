import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { AppState } from 'src/app/store/app.state';
import { setParentCommentContent, toggleAddComment } from 'src/app/store/comments/comments.actions';
import { getAddCommentsOpen, getAddCommentState } from 'src/app/store/comments/comments.selector';
import { getUserId } from 'src/app/store/shared/selectors/shared.selector';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
	storyId: number;
	parentCommentId: number;
	storyContent: string;
	parentCommentContent: string;
	userId: number;
	addCommentOpen: Observable<boolean>;
	form: FormGroup;

	constructor(
		private store: Store<AppState>,
		private commentService: CommentService,
		private formBuilder: FormBuilder
	) {
		this.addCommentOpen = this.store.select(getAddCommentsOpen);
		this.form = this.formBuilder.group({
			content: ['', Validators.required],
		});
		this.storyId = 0;
		this.parentCommentContent = "";
		this.storyContent = "";
		this.parentCommentId = 0;
		this.userId = 0;
	}

	addComment() {
		console.log('clicked');
		let content = this.form.value.content;

		this.commentService
			.addComment({
				storyId: this.storyId,
				parentCommentId: this.parentCommentId,
				userId: this.userId,
				content: content,
			})
			.subscribe((res) => {
				console.log(res);
				this.store.dispatch(toggleAddComment({ open: false }));
				window.location.reload();
			});
	}

	closeAddComment() {
		this.store.dispatch(toggleAddComment({ open: false }));		
	}

	ngOnInit(): void {
		this.store.select(getAddCommentState).subscribe((res) => {
			this.parentCommentContent = res.parentCommentContent;
			this.parentCommentId = res.parentCommentId;
			this.storyId = res.storyId;
			this.storyContent = res.storyContent;
		})
		this.store.select(getUserId).subscribe((res) => {
			this.userId = res;
		})
	}
}
