import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers:[]
})
export class Navbar implements AfterViewInit {
  private platfomeId = inject(PLATFORM_ID);
   private document = inject(DOCUMENT);
  @ViewChild("navbarNav") navbar !: ElementRef;
  public router = inject(Router);
  logo = "assets/Img/GFL Logo_ICON.svg"
  isMobile: boolean;

  constructor() {
    if (isPlatformBrowser(this.platfomeId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platfomeId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platfomeId)) {
      this.mynavvv();
    }
  }

  mynavvv() {
    const nav =this.document.querySelector(".my-nav") as HTMLElement;
    if (!nav) return;

    const navHeight = nav.offsetHeight || 0;
    const TOP_THRESHOLD = navHeight + 5;

    const applyNonHomepageStyle = () => {
      nav.classList.add("navbar-dark");
      nav.classList.remove("navbar-light", "scrolled");
    };

    const isHomePage =
      this.router.url === "/" || this.router.url === "/Homepage";
    // 🔹 Initial check (important on navigation)
    if (isHomePage) {
      applyNonHomepageStyle();
      // return; // ⛔ ignore scroll completely
    }

    // 🔹 Homepage scroll logic only
    window.addEventListener("scroll", () => {
      const isScrolled = window.scrollY > TOP_THRESHOLD;

      if (isScrolled) {
        nav.classList.add("scrolled", "navbar-dark");
        nav.classList.remove("navbar-light");
      } else {
        if (this.router.url !== "/Homepage") {
          nav.classList.add("scrolled", "navbar-dark");

          return;
        }



        nav.classList.remove("scrolled", "navbar-light");
        nav.classList.add("navbar-light");

      }
    });
  }





  hidemenu() {
    this.navbar.nativeElement.classList.remove('show');
    this.mynavvv()
  }

  onToggle() {
    var isShow = this.navbar.nativeElement.classList.value.includes("show");
    isShow ? this.hidemenu() : this.navbar.nativeElement.classList.add("show");
  }

}
