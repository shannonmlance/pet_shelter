import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }
  getAllPets() {
    return this._http.get("/api/pets");
  }
  getOnePet(id) {
    return this._http.get("/api/pets/"+id);
  }
  createOnePet(newPet) {
    return this._http.post("/api/pets", newPet);
  }
  editOnePet(id, editPet) {
    return this._http.put("/api/pets/"+id, editPet);
  }
  deleteOnePet(id) {
    return this._http.delete("/api/pets/"+id);
  }
}
