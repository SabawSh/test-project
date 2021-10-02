import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnItem } from '../@core/types/column.interface';
import { UserInterface } from '../@core/types/user.interface';
import { MapComponent } from '../@shared/components/map/map.component';
import { listOfColumns } from './user-column.const';
import { UserEndpointService } from './user-endpoint.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users: UserInterface[] = [];
pageSize: number = 5;
pageIndex: number = 1;
isVisible: boolean = false;
listOfColumns: ColumnItem[]  = listOfColumns;
  constructor(private readonly userEndpointService: UserEndpointService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
   this.userEndpointService.getUsers().subscribe((response: UserInterface[]) => {
     if(response && response.length) {
       this.users = response;
       this.users.map(user => {
         this.listOfColumns[3].listOfFilter.push({
           text:  user.address.city,
           value:  user.address.city
         })
        });        
     }
   });
  }

  showModal(user: UserInterface) {
    this.modalService.create({
      nzContent: MapComponent,
      nzComponentParams: {
        userInfo: user
    },
    nzFooter: [{
      label: '',
      show: false,
    }],
    });
  }

}
 