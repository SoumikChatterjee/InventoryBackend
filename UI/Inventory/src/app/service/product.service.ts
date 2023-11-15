import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Products";
  getAllProducts():Observable<any>
  {
    return this.http.get<any[]>(this.url).pipe(
        map(data => {
          return data;
        })
      );
  }
}
