import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, AfterViewInit {
  private data = inject(DataService);
  utils = inject(UtilsService);
  contact: any = {};
  @ViewChild('mapElement') mapElement!: ElementRef;
  private mapLoaded = false;

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe((c) => {
      this.contact = c || {};
      if (this.mapLoaded && c?.location) {
        this.initMap(c.location);
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadGoogleMaps();
  }

  private loadGoogleMaps(): void {
    if (typeof google !== 'undefined' && google.maps) {
      this.mapLoaded = true;
      if (this.contact?.location) this.initMap(this.contact.location);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=__initMap`;
    script.async = true;
    script.defer = true;
    (window as any).__initMap = () => {
      this.mapLoaded = true;
      if (this.contact?.location) {
        this.initMap(this.contact.location);
      } else {
        this.initMap({ lat: 47.9016839, lng: 1.9220688 });
      }
    };
    document.body.appendChild(script);
  }

  private initMap(location: { lat: number; lng: number }): void {
    if (!this.mapElement?.nativeElement) return;
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({ position: location, map });
  }
}
