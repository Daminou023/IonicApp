import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CategoriesService } from '../../app/categories-service';

/**
 * Generated class for the AddCategory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategory {
  
  title:'add category';
  public providers: [CategoriesService];
  
  constructor ( 
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	private alertCtrl: AlertController,
  	private viewCtrl: ViewController,
  	public categoriesService: CategoriesService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategory');
  }

  addCategory(label){
  	this.categoriesService.createCategory(label).subscribe(
  		data => this.viewCtrl.dismiss(data),
  		err => this.alertError(err._body),
  		() => console.log('action')
  		)
  	console.log(label);
  }

	alertError(error){
	    let alert = this.alertCtrl.create({
	      title: error,
	      buttons: ['OK']
	    });
	    alert.present();
	}

}
