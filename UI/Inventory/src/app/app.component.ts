import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ActiveService } from './service/active.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  list: NodeListOf<Element>| undefined;

  deltaForm:FormGroup;
  constructor(private fb:FormBuilder,private as:ActiveService){
    this.deltaForm=fb.group({
      deltaControl:''
    })

    this.deltaForm.valueChanges.subscribe((value) => {     
      this.as.mySubject.next(value.deltaControl);      
    })
  }

  ngOnInit() {
    this.list = document.querySelectorAll('.nav-custom li');
    this.list.forEach((item) => {
      item.addEventListener('click', () => {        
        this.activeLink(item);
      });
    });

    let toogle=document.querySelector('.toogle') as HTMLElement;
    let navigation=document.querySelector('.nav-custom');
    let main=document.querySelector('.main');
    toogle.onclick=()=>{
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    }
  }

  activeLink(selected:Element) {
    console.log("Active link called");
    console.log(selected);
    
    this.list?.forEach((item) => {
      item.classList.remove('hovered');
      console.log("for");
      
    });
    console.log("after for");
    
    selected.classList.add('hovered');
  }
}