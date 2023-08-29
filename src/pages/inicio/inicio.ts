import { LoginPage } from './../login/login';
import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ProductosPage } from './../productos/productos';
// import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
// import { CuentaPage } froionic m './../cuenta/cuenta';
/**
 * Generated class for the InicioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {
  cartPage: any = CarritoPage;
  loginPage: any = LoginPage;
  catalogPage: any = ProductosPage;

  public categories: any;
  public loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mgService: Magento2ServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.categories = [];
    this.loading = this.loadingCtrl.create({
      content: "Estamos cargando la información...",
      spinner: "circles"
    });

  }

  ionViewDidLoad() {
    if (this.mgService.getMg2Catalog().length <= 0) {
      this.loading.present();
      this.mgService.getCategories()
        .subscribe(categories => {
          this.loadCatalog(categories);
          this.mgService.setMg2Catalog(this.categories);
          this.loading.dismiss();
        },
        err => {
          this.showAlert("Error de Conexión", 
          "Tenemos problemas para conectarnos con el servidor!, por favor intente más tarde.", 
          null, ["OK"]);
        });
    } else {
      this.categories = this.mgService.getMg2Catalog();
    }
    console.log('Inicio pagina inicial');
  }

  showAlert(title, msg, inputs, buttons) {
    let alert;
    if (inputs == null) {
      alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: buttons
      });

    } else {
      alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        inputs: inputs,
        buttons: buttons
      });

    }
    alert.present();

  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  private loadCatalog(categories){
    var ofertas = categories.children_data[0].children_data[0];
          ofertas.description = "Las mejores ofertas!";
          ofertas.icon = "star";
          ofertas.imagen = "./assets/images/ofertas.png";
          var alimentos = categories.children_data[0].children_data[1];
          alimentos.description = "Todo en alimentos!";
          alimentos.icon = "basket";
          alimentos.imagen = "./assets/images/alimentos.png";
          var aseo = categories.children_data[0].children_data[2];
          aseo.description = "Productos para el hogar!";
          aseo.icon = "home";
          aseo.imagen = "./assets/images/aseohogar.jpg";
          var cuidado = categories.children_data[0].children_data[3];
          cuidado.description = "Productos para la familia!";
          cuidado.icon = "body";
          cuidado.imagen = "./assets/images/cuidadopersonal.jpg";
          this.categories.push(ofertas);
          this.categories.push(alimentos);
          this.categories.push(aseo);
          this.categories.push(cuidado);
  }


}
