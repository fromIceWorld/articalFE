import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}
  // 文章列表
  articalList() {
    return this.http.get('/suger/index');
  }
  // 评论列表
  commentList(params): Observable<any> {
    return this.http.get('/suger/comment', { params });
  }
  // 点赞
  reply(params) {
    return this.http.post('/suger/reply', { params });
  }
  // 登录
  login(form) {
    return this.http.post('/suger/login', form);
  }
}
