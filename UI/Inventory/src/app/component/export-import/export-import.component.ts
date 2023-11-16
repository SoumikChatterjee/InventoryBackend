import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import * as jsonexport from 'jsonexport/dist';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import {  OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent {
  fg:FormGroup
  constructor(private ps:ProductService, private http: HttpClient,private fb:FormBuilder){
    this.ps.getAllProducts().subscribe((data)=>{
      this.jsonData=data;
    });
    
    this.fg = this.fb.group({
      fc: '',
    });
  }


  jsonData:Array<any>=[]
  exportCsv() {
    this.downloadFile(this.jsonData);
    console.log(this.fg.value.fc);
    
  }

  downloadFile(data: any[] , filename = 'data') {
    let arrHeader = [...Object.keys(this.jsonData[0])];
    let csvData = this.ConvertToCSV(data, arrHeader);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.fg.value.fc);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: string | any[], headerList: string[]) {
    console.log(objArray);
    console.log(headerList);
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    let newHeaders =["Id", "Name", "Description", "SKU", "Category", "Manufacturer", "Price", "Quantity Available", "Sold", "Images"];;

    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data:any) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }

  // Import 

  // name = 'Angular ' + VERSION.major;
  // csvContent: any;
  // convertedArray: Array<any> = [];
  // properties: any = '';

  // constructor() {}

  // ngOnInit(): void {}

  // onFileSelect(input) {
  //   const files = input.files;
  //   var fileTypes = ['csv']; //acceptable file types

  //   if (files && files.length) {
  //     var extension = input.files[0].name.split('.').pop().toLowerCase(), //file extension from input file
  //       //Validating type of File Uploaded
  //       isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
  //     //console.log(isSuccess);
  //     //console.log("Filename: " + files[0].name);
  //     // console.log("Type: " + files[0].type);
  //     //  console.log("Size: " + files[0].size + " bytes");
  //     var that = this;
  //     //Flag to check the Validation Result
  //     if (isSuccess) {
  //       const fileToRead = files[0];

  //       const fileReader = new FileReader();

  //       fileReader.onload = function (fileLoadedEvent) {
  //         if(fileLoadedEvent)
  //         {let textFromFileLoaded = fileLoadedEvent.target?.result;
  //           that.csvContent = textFromFileLoaded;}
          

  //         //Flag is for extracting first line
  //         let flag = false;
  //         // Main Data
  //         let objarray: Array<any> = [];
  //         //Properties
  //         let prop: Array<any> = [];
  //         //Total Length
  //         let size: any = 0;

  //         for (const line of that.csvContent.split(/[\r\n]+/)) {
  //           if (flag) {
  //             let obj = {};
  //             for (let k = 0; k < size; k++) {
  //               //Dynamic Object Properties
  //               obj[prop[k]] = line.split(',')[k];
  //             }
  //             objarray.push(obj);
  //           } else {
  //             //First Line of CSV will be having Properties
  //             for (let k = 0; k < line.split(',').length; k++) {
  //               size = line.split(',').length;
  //               //Removing all the spaces to make them usefull
  //               prop.push(line.split(',')[k].replace(/ /g, ''));
  //             }
  //             flag = true;
  //           }
  //         }
  //         //All the values converted from CSV to JSON Array
  //         that.convertedArray = objarray;
  //         that.properties = [];
  //         //Object Keys of Converted JSON Array
  //         that.properties = prop;

  //         let finalResult = {
  //           properties: that.properties,
  //           result: that.convertedArray,
  //         };
  //         //On Convert Success
  //         console.log(finalResult);
  //       };

  //       fileReader.readAsText(fileToRead, 'UTF-8');
  //     } else {
  //       //On Error
  //       console.error('Invalid File Format!');
  //     }
  //   }
  // }

}
