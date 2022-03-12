import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { AppState } from 'src/app/store/app.state';
import { toggleAddComment } from 'src/app/store/comments/comments.actions';
import { getAddCommentsOpen } from 'src/app/store/comments/comments.selector';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
	@Input() storyId!: number;
	@Input() parentCommentId!: number;
	@Input() userId!: number;
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

	ngOnInit(): void {}
}
