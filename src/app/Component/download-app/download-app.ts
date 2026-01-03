import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-download-app',
  imports: [],
  templateUrl: './download-app.html',
  styleUrl: './download-app.scss',
})
export class DownloadApp {
  private platformId = inject(PLATFORM_ID);

  showOnPlay() {
    if (isPlatformBrowser(this.platformId)) {
      window.open("https://play.google.com/store/apps/details?id=com.bhumatamitra.dsserp&pcampaignid=web_share", "_blank");
    }
  }

}
