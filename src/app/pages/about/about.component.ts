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
  mapUnavailable = false;
  @ViewChild('mapElement') mapElement!: ElementRef;
  private mapLoaded = false;

  private get hasValidMapsKey(): boolean {
    const key = environment.googleMapsApiKey;
    return !!key && !key.startsWith('YOUR_');
  }

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe({
      next: (c) => {
        this.contact = c || {};
        if (this.mapLoaded && c?.lat && c?.lon) {
          this.initMap({ lat: c.lat, lng: c.lon });
        }
      },
      error: (err) => console.error('[AboutComponent] contact subscription error:', err),
    });
  }

  ngAfterViewInit(): void {
    if (this.hasValidMapsKey) {
      this.loadGoogleMaps();
    } else {
      console.warn('[AboutComponent] No valid Google Maps API key configured');
      this.mapUnavailable = true;
    }
  }

  private loadGoogleMaps(): void {
    if (typeof google !== 'undefined' && google.maps) {
      this.mapLoaded = true;
      if (this.contact?.lat && this.contact?.lon) this.initMap({ lat: this.contact.lat, lng: this.contact.lon });
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&loading=async&callback=__initMap`;
    script.async = true;
    (window as any).__initMap = () => {
      this.mapLoaded = true;
      if (this.contact?.lat && this.contact?.lon) {
        this.initMap({ lat: this.contact.lat, lng: this.contact.lon });
      } else {
        this.initMap({ lat: 47.9016839, lng: 1.9220688 });
      }
    };
    document.body.appendChild(script);
  }

  private async initMap(location: { lat: number; lng: number }): Promise<void> {
    if (!this.mapElement?.nativeElement) return;
    const mapId = 'about-map';
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: location,
      mapId,
    });
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    new AdvancedMarkerElement({ position: location, map });
  }
}
