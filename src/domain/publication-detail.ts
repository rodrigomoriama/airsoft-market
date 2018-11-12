export interface PublicationDetail {
  id: number;

  codeOperationType: number;
  OperationTypeName: string;

  codeModel: number;
  modelName: string;

  codeProductType: number;
  productTypeName: string;

  codeManufacturer: number;
  manufacturerName: string;

  codeMaterialType: number;
  materialTypeName: string;

  codeConditionType: number;
  conditionTypeName: string;

  codeLocation: number;
  locationName: string;

  codeCaliberType: number;
  caliberTypeName: string;

  codeSystemType: number;
  systemTypeName: string;

  codeActivationType: number;
  activationTypeName: string;

  price: number;
  amount: number;

  hasUpgrade: boolean;
  acceptExchange: boolean;

  title: string;
  upgrades: string;
  itemsIncluded: string;
  range: string;
  fps: string;

  meetingPoint: string;
  desc: string;
  website_link: string;

  dtValidate: number;
  dtValidateFormatted: string;
  dtUpdated: number;
  dtUpdatedFormatted: string;

  phone: string;
  cellphone: string;
  email: string;
  username: string;
}
