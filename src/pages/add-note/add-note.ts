import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, AlertController,ViewController } from 'ionic-angular';
import { Note } from '../../app/note';
import { Category } from '../../app/category';
import { NotesService } from '../../app/notes-service';
import { CategoriesService } from '../../app/categories-service';
import { ListNotes } from '../list-notes/list-notes';
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AddNote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html'
})
export class AddNote {	
	public note: Note;
  	public categories: Category[];
  	public providers: [NotesService, CategoriesService];

  constructor(
  	public navCtrl: NavController, 
  	public viewCtrl: ViewController,
  	public appCtrl: App,
  	public alertCtrl: AlertController,
  	public navParams: NavParams,
  	public notesService: NotesService,
  	public categoriesService: CategoriesService,
  	public popoverCtrl: PopoverController,
  	private toastCtrl: ToastController
  	) {
	  	this.note = new Note;
	  	this.note.date = new Date();
  	}

  getCategories(){
  	this.categoriesService.getCategories().subscribe(
		data => this.categories = data,
		err => alert(err._body),
	);
  }

  createNote(){
	if(!this.note.title || !this.note.date || !this.note.category || !this.note.content) {
		this.alertComplete();
		return;
	}

	this.notesService.createNote(this.note).subscribe(
	data => this.toastSuccess(),
	err => this.alertError(err._body)
	)
  }

	alertError(error){
	    let alert = this.alertCtrl.create({
	      title: error,
	      buttons: ['OK']
	    });
	    alert.present();
	}

	alertComplete(){
	    let alert = this.alertCtrl.create({
	      title: 'please fill all fields.',
	      buttons: ['OK']
	    });
	    alert.present();
	}

	toastSuccess() {
		this.viewCtrl.dismiss(this.notesService.getNotes());
		let toast = this.toastCtrl.create({
			message:'note created!',
			duration: 5000,
			position: 'top'
		});
		toast.onDidDismiss(() => console.log('Dismissed toast'));
  		toast.present();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNote');
    this.getCategories();

  }

}
