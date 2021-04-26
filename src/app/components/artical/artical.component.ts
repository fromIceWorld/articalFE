import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Comment } from '../comment/comment.component';
interface Artical {
  user: {
    avatar: string;
    description: string;
    id: string;
    aliasName: string;
  };
  content: string;
  likeCount: number;
  dislikeCount: number;
  liked: number;
  commentTotal: number;
  time: Date;
  expend: boolean;
}
enum likeStatus {
  dislike = -1,
  like = 1,
  none = 0,
}
interface Respond {
  code: number;
}
interface RespondArticals extends Respond {
  data: Artical[] | [];
}
interface RespondComments extends Respond {
  data: Comment[] | [];
  count: number;
}

@Component({
  selector: 'app-artical',
  templateUrl: './artical.component.html',
  styleUrls: ['./artical.component.css'],
})
export class ArticalComponent implements OnInit {
  articals: Artical[] = [];
  comments: Comment[] = [];
  skeletonLoding: boolean = true;
  commentsCount: number;
  constructor(private service: BaseService) {}
  likeStatus: typeof likeStatus = likeStatus;
  ngOnInit(): void {
    this.getArticalList();
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
  getCommentsList(artical) {
    this.skeletonLoding = true;
    this.expend(artical);
    this.service.commentList({ articalId: artical._id }).subscribe(
      (res: RespondComments) => {
        if (res.code == 200) {
          this.skeletonLoding = false;
          this.comments = res.data;
          this.comments.map((comment) => {
            comment.replyInput = false;
          });
        }
      },
      () => {
        this.skeletonLoding = false;
      }
    );
  }
  // 展开一级评论
  expend(artical) {
    if (artical.expend) {
      this.comments = [];
    }
    artical.expend = !artical.expend;
  }
  // 添加评论成功 ，刷新评论
  refreshComment(artical) {
    this.service.commentList({ articalId: artical._id }).subscribe(
      (res: RespondComments) => {
        if (res.code == 200) {
          this.comments = res.data;
          this.comments.map((comment) => {
            comment.replyInput = false;
          });
        }
      },
      () => {}
    );
  }
  // 加载文章数据
  getArticalList(): void {
    const params = {
      cPage: 1,
      pageSize: 10,
      startDate: '2021-01-01 00:00:00',
      endDate: '2021-04-12 00:00:00',
      assetAssociate: 'all',
      attackSource: true,
    };
    this.service.articalList().subscribe(
      (res: RespondArticals) => {
        if (res.code == 200) {
          this.articals = res.data;
          this.articals.forEach((item) => (item.expend = false));
        }
      },
      () => {}
    );
  }
}
