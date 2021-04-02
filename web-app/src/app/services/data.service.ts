import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Cardset } from '../models/cardset';

@Injectable( {
    providedIn: 'root'
} )
export class DataService {
    constructor( private http: HttpClient ) {

    }

    getCardsets (): Observable<Cardset[]> {
        return this.http.get<Cardset[]>( 'data/cardsets', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        } ).pipe(
            catchError( this.handleError )
        );
    }

    handleError ( error: any ) {
        return throwError( error.message || error );
    }
}