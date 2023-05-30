import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async sendPixelArray(pixelArray: number[]): Promise<any> {
    const formData = new FormData();
    const url = "http://34.125.109.115/predecirIOJson/";
    let bod ="["+pixelArray.join(",")+"]";
    formData.append('IMAGEN', bod);
    console.log(formData)

    return this.http.post(url, formData)
    .toPromise()
    .catch(error => {
      throw new Error("Error sending pixel array: " + error.status);
    });

   
  }


}
