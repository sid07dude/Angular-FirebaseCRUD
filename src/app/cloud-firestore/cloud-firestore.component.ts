import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { CountryService } from '../country.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cloud-firestore',
  templateUrl: './cloud-firestore.component.html',
  styleUrls: ['./cloud-firestore.component.css']
})
export class CloudFirestoreComponent {
  updateCountry: boolean = false;
  countries: Country[];
  Country: Country = new Country();

  countryId = null;
  isToggle: boolean = false;
  formSubmitted: boolean;
  isDelete: boolean;

  constructor(private _countryService: CountryService,
    private angularFirestore: AngularFirestore
  ) {
    this.getAllCountry();
  }

  getAllCountry() {
    this._countryService.getAllCountry().subscribe((data: any) => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      console.log(this.countries);

    });
  }

  onSubmit(f) {
    if (f.form.valid) {

      const CountryData = JSON.parse(JSON.stringify(this.Country));
      debugger;
      if (this.countryId == null) {
        this._countryService.addCountryInforamtion(CountryData);
      } else {
        this._countryService.updateCountryInforamtion(this.countryId, CountryData);
      }
      this.Country = new Country();
      f.submitted = false;
      this.formSubmitted = true;
      this.updateCountry = false;
      setInterval(() => {
        this.formSubmitted = false;

      }, 2000);
    }
  }

  //Edit Country method
  editCountry(countryId) {
    debugger;
    this.countryId = countryId;
    let obj: any = this.countries.filter((x: any) => {
      return x.id == countryId;
    });
    this.updateCountry = true;
    this.Country = obj[0];
  }

  // Delete Country method
  deleteCountry(countryId) {
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {

      this._countryService.deleteCountry(countryId);
      this.isDelete = true;
      setInterval(() => {
        this.isDelete = false;
      }, 2000);
    }
  }

}
