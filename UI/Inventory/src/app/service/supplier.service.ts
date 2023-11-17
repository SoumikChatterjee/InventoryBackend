import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private cachedSuppliertData: any[] = [];
  public SupplierDataFlag = false;

  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Supplier";
  getAllSuppliers():Observable<any>
  {
    if (this.SupplierDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedSuppliertData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.SupplierDataFlag = true;
      return this.http.get<any[]>(this.url).pipe(
        map(data => {
          this.cachedSuppliertData = data;
          return data;
        })
      );
    }
    
  }
  getSuppliersById(id:any):Observable<any>
  {
    return this.http.get<any[]>(this.url+"/"+id);
  }
  deleteSuppliersById(id:any):Observable<any>{
    this.SupplierDataFlag=false;
    return this.http.delete(this.url+"/"+ id);
  }
  putSupplierById(id:any,record:any):Observable<any>{
    this.SupplierDataFlag=false;
    return this.http.put(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postSupplier(record:any):Observable<any>{
    this.SupplierDataFlag=false;
    return this.http.post<any>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
