import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from "../footer/footer";
import { fromEvent } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { throttleTime } from 'rxjs/operators';

import { ScrollSmoother } from 'gsap/all';
import { isPlatformBrowser } from '@angular/common';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, Footer],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About implements AfterViewInit {

  @ViewChildren('animated') animatedEls!: QueryList<ElementRef>;
  @ViewChildren('ctaButton') ctaButtons!: QueryList<ElementRef>;
  @ViewChildren('card') cards!: QueryList<ElementRef>;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1
      });

      // 👇 RxJS scroll listener (throttled)
      fromEvent(window, 'scroll')
        .pipe(throttleTime(150))
        .subscribe(() => this.checkAnimations());

      // Initial check
      this.checkAnimations();
    }
  }

  // Check each element for viewport visibility
  private checkAnimations() {
    this.animatedEls.forEach(el => {
      if (this.isInViewport(el.nativeElement)) {
        el.nativeElement.classList.add('fade-in');
      }
    });
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Button click (Angular way)
  onCtaClick() {
    alert('Thank you for your interest!');
  }

  // Card hover (Angular way)
  onCardEnter(card: HTMLElement) {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  }

  onCardLeave(card: HTMLElement) {
    card.style.transform = 'translateY(0) scale(1)';
  }
}
