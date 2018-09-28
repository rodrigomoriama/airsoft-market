import { FormatFieldHelper } from './../helpers/format-field-helper';
import { AppConstants } from './../app.constants';
import { ConvertDateTimeHelper } from './../helpers/convert-datetime-helper';
import { MessagesHelper } from './../helpers/messages-helper';
import { Subscription } from 'rxjs/internal/Subscription';
import { URLSearchParams } from '@angular/http';
import { PublicationDetail } from './../../domain/publication-detail';
import { PublicationService } from './../../providers/publication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent implements OnInit {

  hasSentNotification: boolean;

  publicationCode: number;
  detail: PublicationDetail;
  hasData: boolean;
  cellphone: string;

  urlCodeSubscription: Subscription;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.urlCodeSubscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params['id']) {
          this.publicationCode = params['id'];
        }
      }
    );
    this.loadGalleryConfig();
    this.loadGalleryImages();
    this.loadData();
  }

  loadData(): void {
    this.publicationService.getPublicationById(new URLSearchParams, this.publicationCode).subscribe(
      data => {
        this.detail = data;
        this.hasData = true;

        if (this.detail.dtValidate) {
          this.detail.dtValidate = ConvertDateTimeHelper.convertEpochToDate(this.detail.dtValidate);
        }

        if (this.detail.phone) {
          this.detail.phone = FormatFieldHelper.formatFieldPhone(this.detail.phone);
        }

        if (this.detail.cellphone) {
          this.cellphone = this.detail.cellphone;
          this.detail.cellphone = FormatFieldHelper.formatFieldCellPhone(this.detail.cellphone);
        }
      },
      error => console.log(error)
    );
  }

  loadGalleryConfig(): void {
    this.galleryOptions = [
      {
        // previewAnimation: false,
        // previewKeyboardNavigation: true,
        previewCloseOnEsc: true,
        previewCloseOnClick: true,
        previewInfinityMove: true,
        // arrowPrevIcon: 'fa fa-arrow-left',
        // arrowNextIcon: 'fa fa-arrow-right',
        width: '300px',
        thumbnailsRemainingCount: true,
        thumbnailsColumns: 3,
        layout: 'thumbnails-top'
      },
      {
        previewSwipe: true,
        previewCloseOnClick: true,
        previewInfinityMove: true,
        arrowPrevIcon: '',
        arrowNextIcon: '',
        breakpoint: 500,
        width: '100%',
        thumbnailsColumns: 3,
        thumbnailsRemainingCount: true,
        layout: 'thumbnails-top'
      }
    ];
  }

  loadGalleryImages(): void {
    this.galleryImages = [];
    this.galleryImages.push({
      small: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png',
      medium: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png',
      big: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
    });

    this.galleryImages.push({
      small: 'https://www.freeiconspng.com/uploads/no-image-icon-6.png',
      medium: 'https://www.freeiconspng.com/uploads/no-image-icon-6.png',
      big: 'https://www.freeiconspng.com/uploads/no-image-icon-6.png'
    });

    this.galleryImages.push({
      small: 'http://brcdn.ar-cdn.com/recipes/medium/nophoto.svg',
      medium: 'http://brcdn.ar-cdn.com/recipes/medium/nophoto.svg',
      big: 'http://brcdn.ar-cdn.com/recipes/medium/nophoto.svg'
    });

    this.galleryImages.push({
      small: 'http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg',
      medium: 'http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg',
      big: 'http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg'
    });
  }

  sendNotificationToUser(): void {

    if (!this.hasSentNotification) {
      MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Notificação enviado com sucesso !');
      this.hasSentNotification = true;
    } else {
      MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Você já enviou uma notificação para o usuário');
    }
  }

  translateBoolean(value: boolean): string {
    return value ? 'Sim' : 'Não';
  }

  sendMessageWhats(): void {
    window.open(`${AppConstants.URL_WHATSAPP_MESSAGE}55${this.detail.cellphone}`);
  }
}
