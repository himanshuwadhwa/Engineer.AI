import { Component, OnInit,  HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public isOpen = false;
  constructor() { }

  @HostListener('window:click', ['$event'])
  onWindowClick($event) {
    const target = $event.target.className;
    if (target === 'overlay-bg') {
      this.isOpen = false;
    }
  }

  ngOnInit() {
  }

  public close() {
    this.isOpen = false;
  }

  public open() {
    this.isOpen = true;
  }

}
