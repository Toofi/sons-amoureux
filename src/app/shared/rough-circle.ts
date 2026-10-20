import {
  afterRenderEffect,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import rough from 'roughjs';

/** Entoure l'élément d'un cercle au stylo rouge, dessiné à la main (rough.js). */
@Directive({
  selector: '[appRoughCircle]',
  host: { style: 'position: relative; display: inline-block;' },
})
export class RoughCircle {
  /** Change la valeur pour redessiner un nouveau trait. */
  readonly appRoughCircle = input<unknown>('');
  readonly color = input('#c0392b');
  readonly pad = input(14);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    Object.assign(this.svg.style, {
      position: 'absolute',
      pointerEvents: 'none',
      overflow: 'visible',
    });
    this.svg.setAttribute('aria-hidden', 'true');
    this.host.appendChild(this.svg);

    const ro = new ResizeObserver(() => this.draw());
    ro.observe(this.host);
    inject(DestroyRef).onDestroy(() => ro.disconnect());

    afterRenderEffect(() => {
      this.appRoughCircle();
      this.draw();
    });
  }

  private draw(): void {
    const pad = this.pad();
    const w = this.host.offsetWidth + pad * 2;
    const h = this.host.offsetHeight + pad * 2;
    if (w <= pad * 2 || h <= pad * 2) return;
    Object.assign(this.svg.style, { left: `${-pad}px`, top: `${-pad}px` });
    this.svg.setAttribute('width', `${w}`);
    this.svg.setAttribute('height', `${h}`);
    this.svg.replaceChildren(
      rough.svg(this.svg).ellipse(w / 2, h / 2, w - 6, h - 6, {
        stroke: this.color(),
        strokeWidth: 2.4,
        roughness: 1.6,
        bowing: 1.5,
        seed: Math.floor(Math.random() * 10_000) + 1,
      }),
    );
  }
}
