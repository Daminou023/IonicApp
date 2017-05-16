import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, AlertController,ViewController } from 'ionic-angular';
import { CategoriesService } from '../../app/categories-service';
import { Category } from '../../app/category';
import { PopoverController } from 'ionic-angular';
import { EditCategory } from '../edit-category/edit-category';
import { AddCategory } from '../add-category/add-category';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ListCategories page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-categories',
  templateUrl: 'list-categories.html',
})
export class ListCategories {

	title = "list of your categories";
  categories : Category[];
  providers: [CategoriesService];

  constructor(
  	private categoriesService: CategoriesService,
  	public popoverCtrl: PopoverController,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private toastCtrl: ToastController ) {
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      data => this.categories = data,
      err => console.error(err),
      () => console.log(this.categories)
     );
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCategories');
    this.getCategories();
  }

  editCategory(category) {
  	let popover = this.popoverCtrl.create(EditCategory,category);
    popover.present();
    popover.onDidDismiss(editedCategory => this.categories[category] = editedCategory);

  }

  addCategory() {
    let popover = this.popoverCtrl.create(AddCategory);
    popover.present();
    popover.onDidDismiss(data => {if (data !==null) {
      this.categories = data;
      this.toastMessage('new category added!');
    }});
  }

  toastMessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top'
    });
    toast.onDidDismiss(() => console.log('Dismissed toast'));
      toast.present();
  }

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category.id).subscribe(
      data => {
         this.categories = this.categories.filter( cat => cat!== category);
         this.toastMessage('succes! category deleted.');
       },
      err => this.toastMessage(err._body),
      () => console.log(this.categories)
    );
  }
}



