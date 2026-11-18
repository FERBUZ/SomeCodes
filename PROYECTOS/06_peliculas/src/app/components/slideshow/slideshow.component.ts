import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
@Component({selector:'app-slideshow',standalone:false,templateUrl:'./slideshow.component.html',styleUrls:['./slideshow.component.css']})
export class SlideshowComponent { @Input() movies: Movie[]=[]; @ViewChild('track') track: ElementRef<HTMLElement>; move(direction:number){const el=this.track.nativeElement; el.scrollBy({left:direction*el.clientWidth,behavior:'smooth'});} }
