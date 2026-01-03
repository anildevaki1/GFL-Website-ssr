import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, DOCUMENT, ElementRef, inject, NgZone, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';

import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import news from "@assets/json/news.json";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';
import { SwiperDirective, SwiperModule } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
Swiper.use([Pagination, Autoplay]);

declare var $: any;

@Component({
  selector: 'app-homepage',
  imports: [Footer, RouterLink, NgOptimizedImage],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Homepage implements AfterViewInit {

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('_swiper', { static: false }) _swiper!: ElementRef<HTMLDivElement>;
  @ViewChild('mySwiper', { read: ElementRef }) mySwiper!: ElementRef;
  @ViewChild('MFGswiper', { read: ElementRef }) MFGswiper!: ElementRef<HTMLDivElement>;



  newsAds = news;
  rainContainer: any;
  directorTyped = false;
  swiperInstance: any;
  mfgSwiperInstance:any;
  mainSlide:any;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1
      });

      // image zoom in
      const mobilebox = this.document.querySelectorAll('.box1, .box2');
      const detail = this.document.querySelector('.Appdetail');
      const Mobileobserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');

              if (entry.target.classList.contains('box1')) {
                setTimeout(() => {
                  detail.classList.add('show');
                }, 300); // delay after box1
              }
              Mobileobserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      mobilebox.forEach(img => Mobileobserver.observe(img));

      //type text animation
      const el = this.document.querySelector(".typing-text-chairmen") as HTMLElement;

      const text = el.dataset['text'] || '';
      let index = 0;
      let started = false;

      el.classList.add('cursor'); // show cursor initially

      const observer1 = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !started) {
          started = true;

          const interval = setInterval(() => {
            el.textContent += text.charAt(index);
            index++;

            if (index === text.length) {
              clearInterval(interval);
              el.classList.remove('cursor'); // 🚫 stop cursor
            }
          }, 120);
        }
      }, { threshold: 0.5 });

      observer1.observe(el);

    this.mainSlide =  new Swiper(this.mySwiper.nativeElement, {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: true
      });

      if (!isPlatformBrowser(this.platformId)) return; // SSR safe

    this.swiperInstance = new Swiper(this._swiper.nativeElement, {
  on: {
    slideChange: () => {
      if (
        this.swiperInstance.realIndex === 1 &&
        !this.directorTyped
      ) {
        this.directorTyped = true;
        this.typeDirectorText();
      }
    }
  }
});

this.mfgSwiperInstance = new Swiper(this.MFGswiper.nativeElement, {
  autoplay: {
    delay: 3000
  }
});
 
      const elements = this.document.querySelectorAll('.fade-in');
      const aboutus = this.document.querySelectorAll('.content');
      //left-right animation slide in
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('show');

          }
        });
      }, { threshold: 0.2 });
      elements.forEach(el => observer.observe(el));
      aboutus.forEach(el => observer.observe(el));



      // image zoom in
      const images = this.document.querySelectorAll('.zoom-img');
      const observer2 = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target); // run once
            }
          });
        },
        { threshold: 0.3 }
      );

      images.forEach(img => observer2.observe(img));

      ($('.carousel') as any).slick({
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: true,
        centerMode: true,

        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              centerMode: true,

            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,

            }
          }
        ]
      });


      gsap.to('.hero-img', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 🌞 Sun rays (wind + parallax)
      gsap.to('.sun-rays', {
        yPercent: 25,
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.sun-rays span', {
        rotation: () => gsap.utils.random(-6, 6),
        x: () => gsap.utils.random(-60, 60),
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 🍃 Leaves (faster depth)
      gsap.to('.leaves', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.leaf', {
        y: '+=30',
        x: '+=20',
        rotation: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 1
      });

      // ✨ Text (very subtle)
      gsap.to('.hero-content', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // this.swiperTags();

    }

  }

  showOnPlay = () => {
    if (isPlatformBrowser(this.platformId)) {
      window.open("https://play.google.com/store/apps/details?id=com.bhumatamitra.dsserp&pcampaignid=web_share", "_blank");
    }
  }



  // swiperTags() {
  //   if (!isPlatformBrowser(this.platformId)) return; // SSR safe


  //   // Wait a tick so Swiper instance is ready
  //   setTimeout(() => {
  //     if (!isPlatformBrowser(this.platformId)) return; // SSR safe
  //     const swiperInstance = this._swiper.swiper(); // <-- Swiper JS instance
  //     const _swiperInstance = this.MFGswiper.swiper(); // <-- Swiper JS instance
  //     if (!_swiperInstance) return;

  //     let currentIndex = 0;
  //     let _currentIndex = 0;
  //     const totalSlides = swiperInstance.slides.length;
  //     const _totalSlides = _swiperInstance.slides.length;

  //     setInterval(() => {
  //       currentIndex == totalSlides ? currentIndex = 0 : currentIndex++;
  //       _currentIndex == _totalSlides ? _currentIndex = 0 : _currentIndex++;

  //       swiperInstance.slideTo(currentIndex);
  //       _swiperInstance.slideTo(_currentIndex);

  //     }, 10000); // 3 seconds delay


  //   });
  // }






  typeDirectorText() {
    const el = this.document.querySelector(".typing-text-director") as HTMLElement;
    if (!el) return;

    const text = el.dataset['text'] || '';
    let index = 0;
    el.textContent = '';

    const interval = setInterval(() => {
      el.textContent += text.charAt(index);
      index++;

      if (index === text.length) {
        clearInterval(interval);
        // cursor stops automatically because animation ends visually
      }
    }, 120);
  }



}
