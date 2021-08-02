import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RealTimeDatabaseComponent } from './real-time-database/real-time-database.component';
import { CloudFirestoreComponent } from './cloud-firestore/cloud-firestore.component';

@NgModule({
  declarations: [
    AppComponent,
    RealTimeDatabaseComponent,
    CloudFirestoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [AngularFireModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
