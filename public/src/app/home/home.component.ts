import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allPets: any;
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getAllPetsFromService();
  }
  getAllPetsFromService() {
    let obs = this._httpService.getAllPets();
    obs.subscribe(data => {
      console.log("Got all pets!", data);
      this.allPets = data;
    })
  }
}
