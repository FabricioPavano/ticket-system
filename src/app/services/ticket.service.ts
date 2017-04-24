import { Injectable }                                from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ReplaySubject }  from 'rxjs/Rx';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Ticket } from '../models/ticket';

@Injectable()
export class TicketService {

  private tickets$  = new ReplaySubject();
  private backendUrl = 'http://localhost:3000';
  private createTicketUrl  = this.backendUrl + '/tickets';
  private getTicketsUrl    = this.backendUrl + '/tickets';
  private getTicketUrl     = this.backendUrl + '/tickets';
  private ticketsPath      = this.backendUrl + '/tickets';



  constructor (private http: Http) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.createTicketUrl, JSON.stringify({ ticket: ticket }), options)
       .map(this.extractData)
       .catch(this.handleError);
  }

  getTickets(forceRefresh?: boolean): Observable<Ticket[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.getTicketsUrl, RequestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTicket(id: number | string): Observable<Ticket> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.getTicketsUrl + '/' + id, RequestOptions)
      .map(response => response.json() || '' )
      .catch(this.handleError);
  }

  deleteTicket(id: number | string): Promise<Number> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(this.getTicketsUrl + '/' + id, RequestOptions)
      .toPromise()
      .then(response => response.status);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}



