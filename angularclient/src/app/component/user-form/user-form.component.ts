import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  private readonly redirectEndpoint: string = '/user/all';
  
  public user: User = new User();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {  }

  public onSubmit(): void {
    this.userService.add(this.user).subscribe(result => this.goToUserList());
  }

  private goToUserList(): void {
    this.router.navigate([this.redirectEndpoint]);
  }
}
