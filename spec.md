# Sunjta Safar – Travel Website

## Current State
New project. Empty backend stub and no frontend pages yet.

## Requested Changes (Diff)

### Add
- Full travel website with multiple sections: Hero, About Us, Destinations, Travel Blog, Gallery, Contact
- Navbar with logo, navigation links, dark/light mode toggle, and mobile hamburger menu
- Hero section: full-screen with travel background, title "Sunjta Safar – Har Safar Ek Kahani", subtitle "Explore the world with us", CTA button "Start Your Journey"
- About Us section: short story about travel passion, mission statement
- Destinations section: card grid with image, description, "Read More" button; search bar to filter destinations
- Travel Blog section: card/grid layout with articles (Budget Travel Tips, Hidden Places, Travel Experiences)
- Gallery section: masonry/grid layout of beautiful travel images
- Contact section: form (Name, Email, Message), social media icons
- Footer: copyright, navigation links
- Loading animation on initial page load
- Smooth scroll animations and hover effects
- Responsive/mobile-friendly layout
- Poppins font

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Generate travel images via image generation tool for hero, destinations, blog, gallery
2. Build single-page React app with all sections
3. Implement dark/light mode with context/localStorage
4. Implement destination search filtering
5. Add scroll animations (Intersection Observer or framer-motion)
6. Add loading screen animation
7. Ensure full mobile responsiveness
