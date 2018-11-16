import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  showPet: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit() {
    this.resetShowPet();
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getOnePetFromService(params['id']);
    })
  }
  resetShowPet() {
    this.showPet = {
      name: '',
      type: '',
      description: '',
      likes: 0,
      skill_one: '',
      skill_two: '',
      skill_three: ''
    }
  }
  getOnePetFromService(id) {
    let obs = this._httpService.getOnePet(id);
    obs.subscribe(data => {
      console.log("Got one pet!", data);
      this.showPet = data;
    })
  }
  deleteOnePetFromService(id) {
    let obs = this._httpService.deleteOnePet(id);
    obs.subscribe(data => {
      console.log("Deleted one pet!", data);
      this.goHome();
    })
  }
  goHome() {
    this._router.navigate(['/pets']);
  }
  likeOnePet(id) {
    this.showPet.likes++;
    this.editOnePetFromService(id, this.showPet);
  }
  editOnePetFromService(id, editPet) {
    let obs = this._httpService.editOnePet(id, editPet);
    obs.subscribe(data => {
      console.log("Edited one pet!", data);
      this.getOnePetFromService(id);
    })
  }
}
