import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errors: any;
  editPet: any;
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit() {
    this.resetEditPet();
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getOnePetFromService(params['id']);
    })
  }
  resetEditPet() {
    this.editPet = {
      name: '',
      type: '',
      description: '',
      skill_one: '',
      skill_two: '',
      skill_three: ''
    }
  }
  getOnePetFromService(id) {
    let obs = this._httpService.getOnePet(id);
    obs.subscribe(data => {
      console.log("Got one pet!", data);
      this.editPet = data;
    })
  }
  editOnePetFromService(id, editPet) {
    let obs = this._httpService.editOnePet(id, editPet);
    obs.subscribe(data => {
      if(data['errmsg']) {
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
        console.log("Edited one pet!", data);
        this.goHome(this.editPet._id);
      }
    })
  }
  goHome(id) {
    this._router.navigate(['/pets',id]);
  }
}
