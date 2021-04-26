import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseService } from '../../services/base.service';

export interface Comment {
  author: string;
  time: string;
  replyTo: string;
  avatar: string;
  content: string;
  children: Comment[];
  replyInput: boolean;
}
interface Res {
  code: number;
}
enum likeStatus {
  dislike = -1,
  like = 1,
  none = 0,
}
interface Respond extends Res {
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
  @Input() skeletonLoding: boolean;
  @Input() comments: Comment[];
  @Input() commentsCount: number;
  @Input() artical: any;
  @Output() refreshComment = new EventEmitter();
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
  likeStatus: typeof likeStatus = likeStatus;

  ngOnInit(): void {}
  commmentSubmit(): void {
    const params = {
      toArtical: this.artical._id,
      toComment: '',
      replyTo: '',
      content: this.addCommment,
    };
    this.service.addComment(params).subscribe((res: Res) => {
      if (res.code == 200) {
        // 添加评论成功
        this.refreshComment.emit('refresh');
      }
    });
  }
  // 展开/关闭 回复评论框
  expendReply(comment) {
    comment.replyInput = !comment.replyInput;
  }
  // 👍逻辑
  checkLiked(artical, from, to) {
    // 取消👍
    if (from == likeStatus.like && to == likeStatus.like) {
      artical.liked = likeStatus.none;
      artical.likeCount >= 0 ? artical.likeCount-- : '';
      // 取消 👎
    } else if (from == likeStatus.dislike && to == likeStatus.dislike) {
      artical.liked = likeStatus.none;
      artical.dislikeCount >= 0 ? artical.dislikeCount-- : '';
      // 👍->👎
    } else if (from == likeStatus.like && to == likeStatus.dislike) {
      artical.liked = likeStatus.dislike;
      artical.likeCount >= 0 ? artical.likeCount-- : '';
      artical.dislikeCount++;
      // 👎->👍
    } else if (from == likeStatus.dislike && to == likeStatus.like) {
      artical.liked = likeStatus.like;
      artical.dislikeCount >= 0 ? artical.dislikeCount-- : '';
      artical.likeCount++;
      // 无->👍
    } else if (from == likeStatus.none && to == likeStatus.like) {
      artical.liked = likeStatus.like;
      artical.likeCount++;
      // 无->👎
    } else {
      artical.liked = likeStatus.dislike;
      artical.dislikeCount++;
    }
  }
  // 更改👍
  likeIt(artical, to) {
    // 更改页面点赞状态
    const from = artical.liked,
      _id = artical.likeId;
    this.checkLiked(artical, from, to);
    // 根据返回接口确认是否更改成功
    this.service.liked({ from, to, _id }).subscribe((res: Respond) => {
      if (res.code !== 200) {
        artical.liked = from;
        this.checkLiked(artical, from, from);
      }
    });
  }
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
