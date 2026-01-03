import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { ScrollSmoother } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap/gsap-core';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-contact',
  imports: [Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {



  ngAfterViewInit() {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1
    });
  }
}
