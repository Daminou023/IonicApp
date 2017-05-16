import { Component, ElementRef } from '@angular/core';
import { NotesService } from '../../app/notes-service';
import { Note } from '../../app/note';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe,PipeTransform} from '@angular/core';
import { EditNote } from '../edit-note/edit-note';
import { PopoverController } from 'ionic-angular';
import { AddNote } from '../add-note/add-note';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the ListNotes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-notes',
  providers: [NotesService],
  templateUrl: 'list-notes.html',
})
export class ListNotes {
	
  title = 'List of Notes';
  public notes : Note[];
  selectedNote: Note;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public notesService: NotesService,
    public popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
  	elementRef: ElementRef
  	) {}

  	getNotes(): void {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => console.error(err),
      () => this.postProcess()
     );
	}

    postProcess(): void {
      this.notes.forEach( n => {
        n.content = n.content.replace(/<\/?content>/g,'');
        n.content = n.content.replace(/<\/?note>/g,'');
        if (n.content.match(/<tag>(.*)<\/tag>/)){
          n.tags = n.content.match(/<tag>(.*?)<\/tag>/g).map(t => t.replace(/<\/?tag>/g,' '));
          n.content = n.content.replace(/<\/?tag>/g,' ');
        }
      });
    }

    deleteNote(note: Note): void {
      this.notesService.deleteNote(note.id).subscribe(
        data => {
          this.notes = this.notes.filter(n => n!== note);
          this.deleteToast();
        },
        err => console.error(err),
      );
    }

  deleteToast(){
    let toast = this.toastCtrl.create({
      message:'note deleted!',
      duration: 2000,
      position: 'top'
    });
    toast.onDidDismiss(() => console.log('Dismissed toast'));
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListNotes');
    this.getNotes();
  }

  presentAddNotePopover() {
    let popover = this.popoverCtrl.create(AddNote);
    popover.present();
    popover.onDidDismiss(newNotesObservable => this.reloadNotes(newNotesObservable));
  }

  reloadNotes(newNotesObservable) {
    if(newNotesObservable !== null) {
      newNotesObservable.subscribe(
        data => this.notes = data,
        err => console.log(err),
        () => this.postProcess(),
        );
    }
  }

  pushEditPage(note){
    this.navCtrl.push(EditNote, {
      note: note,
    });
  }

}
