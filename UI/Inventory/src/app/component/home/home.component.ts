import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { ActiveService } from 'src/app/service/active.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  title = 'Inventory';
  list: NodeListOf<Element>| undefined;

  deltaForm:FormGroup;
  constructor(private fb:FormBuilder,private as:ActiveService, private router:Router){
    this.deltaForm=fb.group({
      deltaControl:''
    })

    this.deltaForm.valueChanges.subscribe((value) => {         
      this.as.mySubject.next(value.deltaControl); 
      this.activeLink(document.querySelectorAll('li')[1] as Element);
      router.navigate(['products']);       
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
    });
    
    selected.classList.add('hovered');
  }
}