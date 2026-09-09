# Award-Site Portfolio Rebuild

## Goal
Rebuild the existing portfolio into a premium, high-energy agency experience while preserving every existing word, number, project, link, language, image, and contact detail exactly as currently stored.

## Visual direction
- Replace the flat neon-template look with a cinematic charcoal interface, translucent graphite surfaces, electric cyan, acid-lime, and warm coral accents.
- Add layered grid, grain, light streak, and depth treatments without decorative blob backgrounds.
- Use stronger editorial typography, asymmetrical compositions, crisp 8px-or-less card radii, and visible section rhythm.
- Keep desktop effects rich while simplifying movement and rendering on touch devices and for reduced-motion users.

## Build scope
1. **Foundation and motion system**
   - Add the approved React 18 versions of React Three Fiber and Drei, plus GSAP/ScrollTrigger and Lenis.
   - Create shared spring-reveal, magnetic-control, tilt-card, parallax-section, smooth-scroll, and desktop-cursor utilities.
   - Replace the current blob background with layered ambient light, perspective grid, and grain.

2. **Hero and navigation**
   - Recompose the hero into an immersive first viewport with a lazy-loaded interactive 3D abstract sculpture/particle field.
   - Add staggered masked word reveals, reactive lighting, floating portrait motion, and magnetic CTAs.
   - Polish navigation depth, active progress, and compact mobile behavior without changing labels.

3. **Section interactions**
   - Preserve the existing count-up stats and restyle their presentation.
   - Add scroll-linked image/text parallax to About.
   - Upgrade “Why work with us” to cursor-reactive 3D tilt cards with animated borders.
   - Give the featured project a floating perspective mockup tied to scroll and pointer position.
   - Rework selected projects into a staggered editorial grid with spring lift and image zoom.
   - Draw the process connector as scroll progress advances.
   - Add icon bounce/rotation responses to services and pause-on-hover to the tech marquee.
   - Convert testimonials to a draggable, momentum-based horizontal carousel.
   - Refine FAQ easing/icon rotation and add animated contact atmosphere plus focus glows.

4. **Performance and accessibility**
   - Lazy-load the hero 3D module, cap pixel ratio, pause unnecessary work offscreen, and avoid layout-driven animation.
   - Disable or simplify 3D, cursor, parallax, and smooth scrolling on mobile/reduced-motion settings.
   - Preserve semantic structure, keyboard access, image alt text, localization, and the existing Vercel setup.

5. **Verification**
   - Resolve the existing contact form type error without changing its text or behavior.
   - Verify build health, runtime console, 3D visibility, animations, and non-overlapping layouts at desktop and mobile widths.

## Technical details
- React Three Fiber `^8.18`, Drei `^9.122`, and Three.js for the procedural hero scene.
- GSAP ScrollTrigger for scroll timelines; Lenis for eased page scroll; Framer Motion for component springs and gestures.
- CSS semantic tokens for all palette, surface, border, shadow, and gradient roles.
- Existing content sources remain untouched unless a structural wrapper is required for animation.
