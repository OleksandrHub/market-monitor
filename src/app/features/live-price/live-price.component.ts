import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { RealtimeService } from '../../core/services/realtime.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-price',
  imports: [CommonModule],
  templateUrl: './live-price.component.html',
  styleUrl: './live-price.component.scss'
})
export class LivePriceComponent implements OnChanges, OnDestroy {
  @Input() instrument: any = null;
  @Input() isSubscribed: boolean = false;
  currentPrice: any = null;
  private priceSubscription: Subscription | null = null;

  constructor(private realtimeService: RealtimeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrument'] && this.instrument) {
      this.priceSubscription = this.realtimeService.getPriceUpdates().subscribe({
        next: (msg: any) => {
          if (msg && msg.instrumentId === this.instrument?.id) {
            this.currentPrice = {
              price: msg.price || msg.ask || msg.bid || 'N/A',
              timestamp: msg.timestamp || new Date()
            };
          } else if ("EUR_USD" === this.instrument?.id) {
            this.currentPrice = {
              price: 500,
              timestamp: new Date()
            }
          }
        },
        error: (err: any) => console.error('Price update error:', err)
      });
    } else if (!this.instrument && this.priceSubscription) {
      this.priceSubscription.unsubscribe();
      this.priceSubscription = null;
      this.currentPrice = null;
    }
  }

  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
  }
}
