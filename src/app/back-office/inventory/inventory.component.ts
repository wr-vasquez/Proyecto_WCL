import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ako-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  items$ = this.inventoryService.getAll();

  constructor(private inventoryService: InventoryService ) {}
}
