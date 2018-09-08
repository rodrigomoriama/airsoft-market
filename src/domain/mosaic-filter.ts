import { Dropdown } from './dropdown';

export interface MosaicFilter {
  operationType: Dropdown;
  productType: Dropdown;
  conditionType: Dropdown;
  caliberType: Dropdown;
  systemType: Dropdown;
  model: Dropdown;
  manufacturer: Dropdown;
  location: Dropdown;

  hasUpgrade: boolean;
  acceptExchange: boolean;

  title: string;
}
