import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
  ],
})
export class AppStoreModule {}
