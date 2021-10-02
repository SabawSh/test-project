import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from '../@shared/shared.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    SharedModule

  ],
  exports:[UsersComponent]
})
export class UsersModule { }
