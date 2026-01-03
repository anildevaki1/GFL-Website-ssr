import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Component/navbar/navbar';
import { isPlatformBrowser,DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0)
    }

  };

  isdrower = signal<boolean>(false);

  @HostListener('window:scroll', []) onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentPosition = window.pageYOffset ||this.document.documentElement.scrollTop;
      currentPosition > 400 ? this.isdrower.set(true) : this.isdrower.set(false);
    }
  }


  bywhatsapp() {
    if (isPlatformBrowser(this.platformId)) {
      var x: any = isPlatformBrowser(this.platformId)
      if (x == "ANDROID" || x == "IOS") {
        window.open("https://wa.me/+918970651844");
      } else {
        window.open("https://web.whatsapp.com/send?phone=8970651844");
      }
    }
  }

}
