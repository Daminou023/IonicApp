import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../app/notes-service';
import { CategoriesService } from '../../app/categories-service';
import { Note } from '../../app/note';
import { Category } from '../../app/category';

/**
 * Generated class for the EditNote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNote {
  private note: Note;
  private categories: Category[];

  constructor(
  	private navCtrl: NavController, 
  	private navParams: NavParams,
  	public notesService: NotesService,
  	public alertCtrl: AlertController,
  	public categoriesService: CategoriesService,) {
  	this.note = navParams.get('note');
  }
  	formatDate():void{
  		console.log(this.note.date);
  	}

	loadCategories(): void {
	    this.categoriesService.getCategories().subscribe(
	      data => this.categories = data,
	      err => alert(err._body)
	     );
	  }

	updateNote(note): void {

	  if(!note.title || !note.date || !note.category || !note.content) {
	    alert ("please fill in all the fields");
	    return;
	  }

	  this.note.title = note.title.trim();
  	  this.note.content = note.content.trim();
	  this.notesService.updateNote(this.note).subscribe(
	    data => this.alertSuccess(),
	    err => this.alertError(err._body)
	  )
	}

	alertError(error){
	    let alert = this.alertCtrl.create({
	      title: 'something went wrong with the DB',
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

	alertSuccess() {
	    let alert = this.alertCtrl.create({
	      title: 'note updated!',
	      buttons: [{
	      	text:'ok',
	      	handler: () => {
          		this.navCtrl.pop();
        	}
	      }]
	    });
	    alert.present();
	}	

	ionViewDidLoad(): void {
		this.loadCategories();
		this.formatDate();
  		console.log('ionViewDidLoad EditNote');
	}
}
