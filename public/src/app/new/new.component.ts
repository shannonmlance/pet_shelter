import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  errors: any;
  constructor(private _httpService: HttpService, private _router: Router) { }
  ngOnInit() {
    this.resetNewPet();
  }
  resetNewPet() {
    this.newPet = {
      name: '',
      type: '',
      description: '',
      skill_one: '',
      skill_two: '',
      skill_three: ''
    }
  }
  createOnePetFromService(newPet) {
    let obs = this._httpService.createOnePet(newPet);
    obs.subscribe(data => {
      if(data['driver']) {
        console.log("Must be unique!", data);
        this.errors = [];
        var message = "All pet names must be unique. This name is already taken.";
        this.errors.push(message);
      }
      else if(data['errors']) {
        console.log("You have errors: ", data);
        this.errors = [];
        if(data['errors'].name) {
          this.errors.push(data['errors'].name.message);
        }
        if(data['errors'].type) {
          this.errors.push(data['errors'].type.message);
        }
        if(data['errors'].description) {
          this.errors.push(data['errors'].description.message);
        }
      }
      else {
        console.log("Created one pet!", data);
        this.resetNewPet();
        this.goHome();
      }
    })
  }
  goHome() {
    this._router.navigate(['/pets']);
  }
}
