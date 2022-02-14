import { Lista } from './../../models/lista.model';
import { async } from "@angular/core/testing";
import { RouterModule, Router } from "@angular/router";

import { Component } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async agregarLista() {
    //this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: "Nueva lista",
      inputs: [
        {
          name: "Titulo",
          type: "text",
          placeholder: "Nombre de la lista",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Crear",
          handler: (data) => {
            console.log(data);
            if (data.Titulo.length === 0) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.Titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          },
        },
      ],
    });

    alert.present();
  }
 
}
