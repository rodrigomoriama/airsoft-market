import { AppConstants } from './../../app.constants';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-page-success-publication',
  templateUrl: './page-success-publication.component.html',
  styleUrls: ['./page-success-publication.component.css']
})
export class PageSuccessPublicationComponent implements OnInit, OnDestroy {

  idPublication: number;
  timeToRedirect: number;

  timer: Subscription;
  subscription: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.timeToRedirect = AppConstants.TIME_REDIRECT_TO_HOME;

    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params['id'] !== undefined) {
          this.idPublication = params['id'];
        }
      }
    );


    this.timer = interval(1000).subscribe(() => {
      if (this.timeToRedirect === 0) {
        this.router.navigate(['home']);
      }
      this.timeToRedirect--;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.timer.unsubscribe();
  }


  goToHome() {
    this.router.navigate(['home']);
  }

  goToDetail() {
    this.router.navigate(['publication-detail', this.idPublication]);
  }
}
