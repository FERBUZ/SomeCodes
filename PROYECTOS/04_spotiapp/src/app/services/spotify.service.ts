import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url= `https://api.spotify.com/v1/${query}`;
    const headers= new HttpHeaders({
      'Authorization' : 'Bearer BQBEfCz2ju_ePLIE1DWOnZ5ByMzxKmFmosjJMhnB3MnkB80yKHJ0061YraXc0YCM6QYKSXVNQ1FeITSH79w08VJvHRWYpBHTZFKG3L0BZEjTkBzz0_7JXcAPA8xNkupzetf9rSkoswGzWy7yapmy7QJS-wnvM2wL9bQ'
    });

    return this.http.get(url, {headers})
  }


  getNewReleases(){
  /*const headers= new HttpHeaders({
  'Authorization' : 'Bearer BQAKA20wcfIfXdJKGBLTcDkDRK80K3IYx_hGemjwucH-t38IKfuX6RI-L1cCUxJNfIjUl3pBzntNSWL1ht4jmbWHvYtozqFpuv77A_HhllCSof556qt-CjW9qoVLqoqHn919ZvVZx7gKLBAl-iJL3KMwumHWbk_jXYY'

});*/

    return this.getQuery('browse/new-releases')
    .pipe(map( data => {
      return data['albums'].items;
    }))
   
      
  }

  getArtistas(termino:string){
    /*const headers= new HttpHeaders({
      'Authorization' : 'Bearer BQAKA20wcfIfXdJKGBLTcDkDRK80K3IYx_hGemjwucH-t38IKfuX6RI-L1cCUxJNfIjUl3pBzntNSWL1ht4jmbWHvYtozqFpuv77A_HhllCSof556qt-CjW9qoVLqoqHn919ZvVZx7gKLBAl-iJL3KMwumHWbk_jXYY'
    
    });*/
    
        return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
        .pipe(map( data => {
          return data['artists'].items;
       
      }))
}


getArtista(id:string){
 
      return this.getQuery(`artists/${id}`);
          
}

getTopTracks(id:string){
 
  return this.getQuery(`artists/${id}/top-tracks?country=mx`).pipe(map(data=> data['tracks']));
  console.log('tracks');
}
}