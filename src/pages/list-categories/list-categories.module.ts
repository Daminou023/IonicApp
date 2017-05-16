import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategories } from './list-categories';

@NgModule({
  declarations: [
    ListCategories,
  ],
  imports: [
    IonicPageModule.forChild(ListCategories),
  ],
  exports: [
    ListCategories
  ]
})
export class ListCategoriesModule {}
