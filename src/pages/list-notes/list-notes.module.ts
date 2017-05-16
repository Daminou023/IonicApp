import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListNotes } from './list-notes';

@NgModule({
  declarations: [
    ListNotes,
  ],
  imports: [
    IonicPageModule.forChild(ListNotes),
  ],
  exports: [
    ListNotes
  ]
})
export class ListNotesModule {}
