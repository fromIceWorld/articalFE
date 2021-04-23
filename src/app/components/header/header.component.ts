import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getUserInfo } from 'src/app/store/selectors';
import { BaseService } from '../../services/base.service';
import { login } from '../../store/actions';
import { UserInfo } from '../../store/actions/login.actions';
import { AppStoreModule } from '../../store/store.module';

interface Respond {
  code: number;
  data: any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: UserInfo;
  modalShow: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private $store: Store<AppStoreModule>,
    private fb: FormBuilder,
    private service: BaseService
  ) {}

  ngOnInit(): void {
    this.$store
      .pipe(select('user' as any), select(getUserInfo))
      .subscribe((user) => {
        console.log(user);
        this.user = user;
      });
    this.loginForm = this.fb.group({
      userName: ['cbb', [Validators.required]],
      passWord: ['123456', [Validators.required]],
    });
  }
  login() {
    if (!this.user.isLogin) {
      this.modalShow = true;
    }
  }
  handleCancel() {
    this.modalShow = false;
  }
  // 登录提交
  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    let form = this.loginForm.getRawValue();

    this.service.login(form).subscribe((res: Respond) => {
      const { name, avatar, id, type } = res.data;
      if (res.code! == 200) {
        this.$store.dispatch(
          login({
            user: {
              name,
              avatar,
              id,
              type,
              isLogin: true,
            },
          })
        );
        this.modalShow = false;
      }
    });
  }
  // 退出登录
  loginOut() {
    this.$store.dispatch(
      login({
        user: {
          name: '',
          avatar: '',
          id: '',
          type: '',
          isLogin: false,
        },
      })
    );
  }
}
