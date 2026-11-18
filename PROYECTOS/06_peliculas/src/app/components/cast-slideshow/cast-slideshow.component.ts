import { Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/credits-response';
@Component({selector:'app-cast-slideshow',standalone:false,templateUrl:'./cast-slideshow.component.html',styleUrls:['./cast-slideshow.component.css']})
export class CastSlideshowComponent { @Input() cast:Cast[]=[]; }
