import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {
  }

  getAllCountry() {
    return this.angularFirestore.collection('Country').snapshotChanges();
  }

  //Adding new Country 
  addCountryInforamtion(countryInfo) {
    return this.angularFirestore.collection('Country').add(countryInfo);
  }
  //Update Existing Country
  updateCountryInforamtion(countryid, countryInfo) {
    delete countryInfo.id;
    this.angularFirestore.doc('Country/' + countryid).update(countryInfo);
  }

  //Delete Country
  deleteCountry(id) {
    this.angularFirestore.doc('Country/' + id).delete();
  }
}


