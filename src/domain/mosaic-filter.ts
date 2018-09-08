import { Dropdown } from './dropdown';

export interface MosaicFilter {
  operationType: Dropdown;
  productType: Dropdown;
  conditionType: Dropdown;
  caliberType: Dropdown;
  systemType: Dropdown;
  model: Dropdown;
  manufacturer: Dropdown;

  hasUpgrade: boolean;
  acceptExchange: boolean;

  location: string;
  title: string;
}
