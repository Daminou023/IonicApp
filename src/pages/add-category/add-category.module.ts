import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCategory } from './add-category';

@NgModule({
  declarations: [
    AddCategory,
  ],
  imports: [
    IonicPageModule.forChild(AddCategory),
  ],
  exports: [
    AddCategory
  ]
})
export class AddCategoryModule {}
