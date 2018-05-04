


import { trigger,
  state,
  style,
  animate,
  transition,
  query,
  keyframes,
  stagger,
  group,
  animateChild,
  useAnimation
} from '@angular/animations';

import { bounce } from 'ng-animate';


export const routerTransition =
  trigger('routerTransition', [
    transition('home => dashboard, dashboard => home', [
        group([
          query(':enter ',  style({ opacity: 0, transform: 'translateY(-100%)' }), {optional: true}),
          query(':leave', [
            animate('0.5s', style({ opacity: 0.5 }))
          ], {optional: true}),
          query(':enter', [
            animate('1s cubic-bezier(.175,0.885,.32,1.275)', style({opacity: 1, transform: 'translateY(0)'}))
          ], {optional: true})
        ]),
      query('@cards', animateChild())
      ])
  ]);


export const Cards =
  trigger('cards', [
  transition(':enter', [
    query('.week-card', style({ opacity: 0 }), {optional: true}),
    query('.week-card', stagger('200ms', [
      animate('1s cubic-bezier(.175,0.885,.32,1.275)', keyframes([
        style({opacity: 0, transform: 'translateY(75%)', offset: 0}),
        style({opacity: .8, transform: 'translateY(25px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
      ]))
    ]), {optional: true})
  ])
]);


export const Bounce =
  trigger('bounce',
    [transition('* => *', useAnimation(bounce))
    ]);

