import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Category } from '../../app/category';
import { AlertController } from 'ionic-angular';
import { CategoriesService } from '../../app/categories-service';


/**
 * Generated class for the EditCategory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategory {
	private category: Category;

  constructor(
  	private navCtrl: NavController,
  	private viewCtrl: ViewController,
  	private appCtrl: App, 
  	private alertCtrl: AlertController,
  	private categoriesService: CategoriesService,
  	public navParams: NavParams)
  {
  	this.category = navParams.data;
  }

  updateCategory(category,replacement){
  	category.label = replacement;
  	this.categoriesService.updateCategory(category).subscribe(
		data => this.alertSuccess(data),
	    err => this.alertError(err._body)
	)
  }

  alertSuccess(data) {
	    let alert = this.alertCtrl.create({
	      title: data,
	      buttons: [{
	      	text:'ok',
	      	handler: () => {
          		this.viewCtrl.dismiss(this.category);
        	}
	      }]
	    });
	    alert.present();
	}

  alertError(error){
	    let alert = this.alertCtrl.create({
	      title: 'something went wrong with the DB',
	      buttons: ['OK']
	    });
	    alert.present();
	}	

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategory');
  }

}
