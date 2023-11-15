import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  list: NodeListOf<Element>| undefined;

  ngOnInit() {
    this.list = document.querySelectorAll('.nav-custom li');
    this.list.forEach((item) => {
      item.addEventListener('mouseover', () => {        
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