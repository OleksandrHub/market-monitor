import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { RealtimeService } from '../../core/services/realtime.service';
import { LivePrice, SelectInstrument } from '../../core/models/price.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-price',
  imports: [CommonModule],
  templateUrl: './live-price.component.html',
  styleUrl: './live-price.component.scss'
})
export class LivePriceComponent implements OnDestroy {
  @Input() active = false;
  @Input() instrument?: SelectInstrument;

  public bid?: number;
  public ask?: number;
  public last?: number;
  public timestamp = Date.now();

  private wsSubscription?: Subscription;

  constructor(private realtimeService: RealtimeService, private authService: AuthService) { }

  ngOnChanges() {
    if (this.active) {
      this.subscribe();
    } else {
      this.unsubscribe();
    }
  }

  public subscribe() {
    const token = this.authService.getAccessToken();
    if (!this.instrument?.id || !token) return;

    this.wsSubscription = this.realtimeService.connect(token, this.instrument.id)
      .subscribe((data: LivePrice) => {
        // console.log('Live update:', data)
        this.bid = data.bid ?? this.bid;
        this.ask = data.ask ?? this.ask;
        this.last = data.last ?? this.last;
        this.timestamp = Date.now();
      });
  }

  public unsubscribe() {
    this.wsSubscription?.unsubscribe();
    this.realtimeService.disconnect();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
