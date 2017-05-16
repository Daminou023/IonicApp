import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Pipe,PipeTransform} from '@angular/core';

import { MyApp } from './app.component';
import { ListNotes } from '../pages/list-notes/list-notes';
import { AddNote } from '../pages/add-note/add-note';
import { AddCategory } from '../pages/add-category/add-category';
import { EditNote } from '../pages/edit-note/edit-note';
import { ListCategories } from '../pages/list-categories/list-categories';
import { EditCategory } from '../pages/edit-category/edit-category';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';

import { NotesService } from './notes-service';
import { CategoriesService } from './categories-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ListNotes,
    AddNote,
    EditNote,
    ListCategories,
    EditCategory,
    AddCategory,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListNotes,
    AddNote,
    EditNote,
    ListCategories,
    EditCategory,
    AddCategory,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    Toast,
    NotesService,
    CategoriesService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
