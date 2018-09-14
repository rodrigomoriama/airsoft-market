import { Dropdown } from './../../domain/dropdown';
import { MosaicFilterComponent } from './mosaic-filter/mosaic-filter.component';
import { AppConstants } from './../app.constants';
import { Mosaic } from './../../domain/mosaic';
import { URLSearchParams } from '@angular/http';
import { MosaicService } from './../../providers/mosaic.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs';
import { MosaicFilter } from 'src/domain/mosaic-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit, OnDestroy {

  selectedFilters: MosaicFilter;

  mosaicData: Mosaic[];

  emptyItem: Dropdown;

  mosaicSubscription: Subscription;
  mosaicFilterSubscription: Subscription;

  @ViewChild('filter') filter: MosaicFilterComponent;

  constructor(private mosaicService: MosaicService,
    private router: Router) {
    this.emptyItem = { id: null, name: '' };
  }

  ngOnInit() {
    this.intervalMosaic();

    this.mosaicFilterSubscription = this.filter.filterEmitter.subscribe(
      (data: MosaicFilter) => {
        this.selectedFilters = data;

        if (!this.selectedFilters.operationType) {
          this.selectedFilters.operationType = this.emptyItem;
        }

        if (!this.selectedFilters.productType) {
          this.selectedFilters.productType = this.emptyItem;
        }

        if (!this.selectedFilters.conditionType) {
          this.selectedFilters.conditionType = this.emptyItem;
        }

        if (!this.selectedFilters.caliberType) {
          this.selectedFilters.caliberType = this.emptyItem;
        }

        if (!this.selectedFilters.systemType) {
          this.selectedFilters.systemType = this.emptyItem;
        }

        if (!this.selectedFilters.model) {
          this.selectedFilters.model = this.emptyItem;
        }

        if (!this.selectedFilters.manufacturer) {
          this.selectedFilters.manufacturer = this.emptyItem;
        }

        if (!this.selectedFilters.location) {
          this.selectedFilters.location = this.emptyItem;
        }

        this.loadData();
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribeData();
  }

  intervalMosaic() {
    this.loadData();
    // this.mosaicSubscription = interval(AppConstants.INTERVAL_CHECK_MOSAIC).subscribe(() => {
    //   this.loadData();
    // });
  }

  unsubscribeData() {
    // this.mosaicSubscription.unsubscribe();
    this.mosaicFilterSubscription.unsubscribe();
  }

  loadData() {
    const params = this.loadFilterParams();
    this.mosaicService.getAllProductsMosaic(params).subscribe(
      (data: Mosaic[]) => {
        this.mosaicData = data;
      },
      error => console.log(error)
    );
  }

  loadFilterParams(): URLSearchParams {
    const params = new URLSearchParams();

    if (this.selectedFilters) {

      if (this.selectedFilters.operationType.id) {
        params.set(AppConstants.PARAMS_MOSAIC_OPERATION_TYPE, this.selectedFilters.operationType.name);
      }

      if (this.selectedFilters.productType.id) {
        params.set(AppConstants.PARAMS_MOSAIC_PRODUCT_TYPE, this.selectedFilters.productType.name);
      }

      if (this.selectedFilters.conditionType.id) {
        params.set(AppConstants.PARAMS_MOSAIC_CONDITION_TYPE, this.selectedFilters.conditionType.name);
      }

      if (this.selectedFilters.caliberType.id) {
        params.set(AppConstants.PARAMS_MOSAIC_CALIBER_TYPE, this.selectedFilters.caliberType.name);
      }

      if (this.selectedFilters.systemType.id) {
        params.set(AppConstants.PARAMS_MOSAIC_SYSTEM_TYPE, this.selectedFilters.systemType.name);
      }

      if (this.selectedFilters.model.id) {
        params.set(AppConstants.PARAMS_MOSAIC_MODEL, this.selectedFilters.model.name);
      }

      if (this.selectedFilters.manufacturer.id) {
        params.set(AppConstants.PARAMS_MOSAIC_MANUFACTURER, this.selectedFilters.manufacturer.name);
      }

      if (this.selectedFilters.location.id) {
        params.set(AppConstants.PARAMS_MOSAIC_LOCATION, this.selectedFilters.location.name);
      }

      if (this.selectedFilters.title) {
        params.set(AppConstants.PARAMS_MOSAIC_TITLE, this.selectedFilters.title);
      }
    }

    return params;
  }


  removeOperationTypeFilter() {
    this.selectedFilters.operationType = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('operationType').setValue(null);
  }

  removeProductTypeFilter() {
    this.selectedFilters.productType = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('productType').setValue(null);
  }

  removeCaliberTypeFilter() {
    this.selectedFilters.caliberType = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('caliberType').setValue(null);
  }

  removeSystemTypeFilter() {
    this.selectedFilters.systemType = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('systemType').setValue(null);
  }

  removeConditionTypeFilter() {
    this.selectedFilters.conditionType = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('conditionType').setValue(null);
  }

  removeModelFilter() {
    this.selectedFilters.model = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('model').setValue(null);
  }

  removeManufacturerFilter() {
    this.selectedFilters.manufacturer = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('manufacturer').setValue(null);
  }

  removeLocationFilter() {
    this.selectedFilters.location = this.emptyItem;
    this.loadData();
    this.filter.filterForm.get('location').setValue('');
  }

  removeTitleFilter() {
    this.selectedFilters.title = '';
    this.loadData();
    this.filter.filterForm.get('title').setValue('');
  }

  redirectToPublicationDetail(item: Mosaic) {
    this.router.navigate(['publication-detail', item.id]);
  }
}
