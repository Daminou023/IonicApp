import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCategory } from './edit-category';

@NgModule({
  declarations: [
    EditCategory,
  ],
  imports: [
    IonicPageModule.forChild(EditCategory),
  ],
  exports: [
    EditCategory
  ]
})
export class EditCategoryModule {}
