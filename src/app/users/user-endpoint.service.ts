import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestClientService } from '../@core/services/rest-client.service';
import { UserInterface } from '../@core/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserEndpointService {

  constructor(private readonly restClientService: RestClientService) { }


  getUsers(): Observable<UserInterface[]>  {
      return this.restClientService.get(`/users`).pipe(map(res  => res));

  }
}
