import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { CountryService } from '../country.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database/database';

@Component({
  selector: 'app-real-time-database',
  templateUrl: './real-time-database.component.html',
  styleUrls: ['./real-time-database.component.css']
})
export class RealTimeDatabaseComponent {
  updateCountry: boolean = false;
  countries: Country[];
  Country: Country = new Country();

  countryId = null;
  isToggle: boolean = false;
  formSubmitted: boolean;
  isDelete: boolean;

  CountryList: AngularFireList<any>;

  constructor(private _countryService: CountryService,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.getAllCountry();
  }

  getAllCountry() {
    this.CountryList = this.angularFireDatabase.list('Country');
    this.CountryList.snapshotChanges().subscribe((data: any) => {
      this.countries = data.map(e => {
        return {
          id: e.payload.key,
          ...e.payload.val()
        } as Country;
      });
      console.log(this.countries);
    });

  }

  onSubmit(f) {
    if (f.form.valid) {

      if (this.countryId == null) {
        this.CountryList.push({
          CountryName: this.Country.CountryName,
          CountryShortName: this.Country.CountryShortName,
          Currency: this.Country.Currency,
          CurrencyShortName: this.Country.CurrencyShortName
        })

      } else {
        this.CountryList.update(this.countryId, {
          CountryName: this.Country.CountryName,
          CountryShortName: this.Country.CountryShortName,
          Currency: this.Country.Currency,
          CurrencyShortName: this.Country.CurrencyShortName
        })
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

      this.CountryList.remove(countryId);
      this.isDelete = true;
      setInterval(() => {
        this.isDelete = false;
      }, 2000);
    }
  }

}
