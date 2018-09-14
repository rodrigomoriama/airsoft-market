import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

export class MessagesHelper {

  // Snack
  private static createConfig(style: string, time?: number): MatSnackBarConfig {
    const config = {duration: time ? time : 2000};
    if (style) {
      config['extraClasses'] = [style];
    }
    return config;
  }

  static handleSimpleMsgSnack(snackBar: MatSnackBar, content: string) {
    this.handleSimpleSnack(snackBar, content, undefined);
  }

  static handleSimpleErrorSnack(snackBar: MatSnackBar, content: string) {
    this.handleSimpleSnack(snackBar, content, 'error-snackbar');
  }

  static handleSimpleErrorMessageSnack(snackBar: MatSnackBar, content: string) {
    snackBar.open(content, '', this.createConfig('error-snackbar', 5000));
  }

  private static handleSimpleSnack(snackBar: MatSnackBar, content: string, style: string) {
    this.openSnackBar(snackBar, content, this.createConfig(style));
  }

  static handlerMsgSnack(snackBar: MatSnackBar, error: any | undefined) {
    this.handlerSnack(snackBar, error, undefined);
  }

  static handlerErrorSnack(snackBar: MatSnackBar, error: any | undefined) {
    this.handlerSnack(snackBar, error, 'error-snackbar');
  }

  private static handlerSnack(snackBar: MatSnackBar, error: any | undefined, style: string) {
    const config = this.createConfig(style);

    if (error.erros) {
      // this.openSnackBar(snackBar, error.erros[error.erros.length - 1].message, config);
      this.openSnackBar(snackBar, error.erros[0].message, config);
      return;
    }
    if (error.message) {
      if (error.message.indexOf('Access is denied') >= 0) {
        this.openSnackBar(snackBar, 'Acesso negado', config);
        return;
      }
    }

    this.openSnackBar(snackBar, 'Erro ao executar a operação', config);
  }

  private static openSnackBar(snackBar: MatSnackBar, content: string, config: MatSnackBarConfig) {
    snackBar.open(content, '', config);
  }
}
