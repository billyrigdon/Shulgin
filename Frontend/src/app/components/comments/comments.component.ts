import { Component, Input, OnInit } from '@angular/core';
import { StoryComment } from 'src/app/types/comment';
import { CommentVote } from 'src/app/types/vote';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() storyId!: number
  
  comments: Array<StoryComment>
  
  constructor() { 
    this.comments = []
  }

  ngOnInit(): void {
  }

}
