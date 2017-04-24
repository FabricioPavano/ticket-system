import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {

  categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
  ];

  model = new Ticket(1, '', this.categories[0], '');

  submitted = false;

  newTicket() {
    this.model = new Ticket(42, '', 'Category 1', '');
  }

  onSubmit() {
    // Save it to backend
    this.ticketService.createTicket(this.model).subscribe(
                     ticket  => console.log(ticket),
                     error   => console.error(error));

    this.submitted = true;
  }

  constructor(private ticketService: TicketService) { }
}
