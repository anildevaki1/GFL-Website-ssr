import { Component, DOCUMENT, inject } from '@angular/core';
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

declare const $: any;
@Component({
  selector: 'app-product',
  imports: [Footer],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  providers:[]
})
export class Product {
  img: string;
  info: string;
  label: string; 
  private router = inject(Router);
  private document = inject(DOCUMENT);
  ngAfterViewInit() {

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1
    });

    const elements =this.document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }


  inDetail(name) {
    this.router.navigate(["/ProductInfo"], { state: { "name": name } });
  }


  getInfo(event) {
    const card = (event.currentTarget as HTMLElement);

    const imgSrc =
      card.querySelector('.card-img-top')?.getAttribute('src');

    const cardText =
      card.querySelector('.card-text')?.textContent?.trim();

    this.label = card.querySelector('.card-title')?.textContent.trim();

    this.img = imgSrc;
    this.info = cardText;
    $("#staticBackdrop").modal("show");
  }
}
