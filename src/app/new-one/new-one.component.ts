import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-one',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './new-one.component.html',
  styleUrl: './new-one.component.css',
})
export class NewOneComponent {
  detail: string = 'more details';
}
