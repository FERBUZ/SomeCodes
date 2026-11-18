import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subject,takeUntil} from 'rxjs';
import {PeliculasService} from '../../services/peliculas.service';
import {Movie} from '../../interfaces/cartelera-response';
@Component({selector:'app-home',standalone:false,templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit,OnDestroy {
 movies:Movie[]=[]; moviesSlideshow:Movie[]=[]; error=false; loading=false; exhausted=false;
 private destroyed=new Subject<void>();
 constructor(private service:PeliculasService){}
 ngOnInit(){this.service.resetCarteleraPage();this.load();}
 @HostListener('window:scroll') onScroll(){if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-400&&!this.error)this.load();}
 load(){if(this.loading||this.exhausted)return;this.loading=true;this.error=false;this.service.getCartelera().pipe(takeUntil(this.destroyed)).subscribe({next:movies=>{if(!this.movies.length)this.moviesSlideshow=movies;const ids=new Set(this.movies.map(m=>m.id));this.movies=[...this.movies,...movies.filter(m=>!ids.has(m.id))];this.exhausted=movies.length===0;this.loading=false;},error:()=>{this.error=true;this.loading=false;}});}
 ngOnDestroy(){this.destroyed.next();this.destroyed.complete();this.service.resetCarteleraPage();}
}