import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

export interface Comment {
  author: string;
  time: string;
  replyTo: string;
  avatar: string;
  content: string;
  children: Comment[];
}

interface Respond {
  code: number;
  data: Comment[];
  count: number;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() expend: boolean;
  @Input() comments: Comment[];
  @Input() commentsCount: number;
  commentLoading: boolean = true;
  currentReplay = [
    {
      author: 'Han Solo',
      time: '4-26',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      children: [
        {
          author: 'Han Solo',
          time: '三小时前',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources' +
            '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
          author: 'Han Solo',
          time: '四小时前',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources' +
            '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
      ],
    },
  ];
  isVisible = false;
  // 输入建议列表
  suggestions: string[] = ['123'];
  addCommment: string = '';
  submitting: boolean = false;
  moreComments: Comment[] = [];
  moreCommentsCount: number;
  constructor(private service: BaseService) {}

  ngOnInit(): void {}
  commmentSubmit(): void {}
  // 查看回复
  showReply(comment): void {
    this.isVisible = true;
    this.currentReplay = [comment];
    this.service.commentList({ commentId: comment.commentId }).subscribe(
      (res: Respond) => {
        if (res.code == 200) {
          this.moreComments = res.data;
          this.moreCommentsCount = res.count;
        }
      },
      (err) => {
        this.isVisible = false;
      }
    );
  }
  // 关闭回复弹窗
  handleCancel(): void {
    this.isVisible = false;
    this.moreComments = [];
  }
}
