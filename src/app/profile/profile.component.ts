import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileRouteOption: string;

  constructor(private router: Router) {
    this.checkRoute();
  }

  ngOnInit() { }

  checkRoute() {
    // console.log(this.router.url);

    if (this.router.url.includes('edit')) {
      this.profileRouteOption = 'edit';
      return;
    }

    if (this.router.url.includes('change-password')) {
      this.profileRouteOption = 'change-password';
      return;
    }

    this.onSelectedOption({value: 'edit'});
  }

  onSelectedOption(event: any) {
    this.profileRouteOption = event.value;
    this.router.navigate(['profile/' + this.profileRouteOption]);
  }
}
