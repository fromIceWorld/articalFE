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
  commentsCount: number;
  constructor(private service: BaseService) {}

  ngOnInit(): void {
    this.getArticalList();
  }
  getCommentsList(artical) {
    this.expend(artical);
    this.service.commentList({ articalId: artical._id }).subscribe(
      (res: RespondComments) => {
        if (res.code == 200) {
          this.comments = res.data;
        }
      },
      () => {}
    );
  }
  // 展开一级评论
  expend(artical) {
    if (artical.expend) {
      this.comments = [];
    }
    artical.expend = !artical.expend;
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
