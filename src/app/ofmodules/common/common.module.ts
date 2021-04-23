import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ArticalComponent } from '../../components/artical/artical.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { ReplayCardComponent } from '../../components/replay-card/replay-card.component';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
  declarations: [ArticalComponent, CommentComponent, ReplayCardComponent],
  imports: [
    NzIconModule,
    NzInputModule,
    RouterModule,
    NzCardModule,
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzListModule,
    NzMenuModule,
    NzTabsModule,
    NzButtonModule,
    NzDropDownModule,
    NzBadgeModule,
    NzAvatarModule,
    NzCommentModule,
    NzMentionModule,
    FormsModule,
    NzModalModule,
    NzDividerModule,
    NzSkeletonModule,
    AppStoreModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzCheckboxModule,
    NzFormModule,
  ],
})
export class AppCommonModule {}
