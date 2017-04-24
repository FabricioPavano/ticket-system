import 'rxjs/add/operator/switchMap';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {

  tickets: Ticket[];

  constructor(
    private service: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTickets();
  }

  getTickets(): void {
    this.service
      .getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }

  onSelect(ticket): void {
    this.router.navigate([ticket.id], { relativeTo: this.route });
  }

  onDelete(ticket): void {
    if (window.confirm(`Are you sure you want to delete ticket ${ticket.id} ?`)) {
      this.service.deleteTicket(ticket.id).then( status => {
        if (+status === 204) {
          this.tickets = this.tickets.filter(h => h !== ticket);
        }
      });
    }
  }

  // Improves performance of ngFor
  trackByTickets(index: number, ticket: Ticket): number { return ticket.id; }

}
