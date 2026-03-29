import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Moon,
  Search,
  Send,
  Sun,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiX } from "react-icons/si";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

interface GalleryImage {
  src: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const destinations: Destination[] = [
  {
    id: 1,
    name: "Kyoto",
    location: "Japan",
    description:
      "Ancient temples, mystical forests, and timeless culture await in the heart of Japan.",
    image: "/assets/generated/dest-kyoto.dim_600x400.jpg",
  },
  {
    id: 2,
    name: "Santorini",
    location: "Greece",
    description:
      "Whitewashed villages perched on volcanic cliffs above the deep blue Aegean Sea.",
    image: "/assets/generated/dest-santorini.dim_600x400.jpg",
  },
  {
    id: 3,
    name: "Patagonia",
    location: "Chile",
    description:
      "Jagged peaks, glacial lakes, and untamed wilderness at the edge of the world.",
    image: "/assets/generated/dest-patagonia.dim_600x400.jpg",
  },
  {
    id: 4,
    name: "Bali",
    location: "Indonesia",
    description:
      "Emerald rice terraces, sacred temples, and a culture that feeds the soul.",
    image: "/assets/generated/dest-bali.dim_600x400.jpg",
  },
  {
    id: 5,
    name: "Marrakech",
    location: "Morocco",
    description:
      "Ancient medinas, vibrant souks, and the endless romance of the Sahara.",
    image: "/assets/generated/dest-morocco.dim_600x400.jpg",
  },
  {
    id: 6,
    name: "Reykjavik",
    location: "Iceland",
    description:
      "Fire and ice collide: volcanoes, glaciers, geysers and the dancing northern lights.",
    image: "/assets/generated/gallery-1.dim_600x400.jpg",
  },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Budget Travel: See the World for Less",
    excerpt:
      "Smart tips to stretch your travel budget without sacrificing the experience.",
    image: "/assets/generated/blog-budget.dim_700x450.jpg",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Hidden Places: Off the Beaten Path",
    excerpt: "The world's best-kept secrets, waiting for the curious traveler.",
    image: "/assets/generated/blog-hidden.dim_700x450.jpg",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "A Journey That Changed Everything",
    excerpt:
      "One traveler's story of discovery, growth, and the road less traveled.",
    image: "/assets/generated/blog-experience.dim_700x450.jpg",
    readTime: "6 min read",
  },
];

const galleryImages: GalleryImage[] = [
  { src: "/assets/generated/gallery-1.dim_600x400.jpg", label: "Iceland" },
  { src: "/assets/generated/gallery-2.dim_600x600.jpg", label: "Maldives" },
  { src: "/assets/generated/gallery-3.dim_600x400.jpg", label: "Cambodia" },
  { src: "/assets/generated/gallery-4.dim_600x800.jpg", label: "Norway" },
  { src: "/assets/generated/gallery-5.dim_600x400.jpg", label: "Sahara" },
  { src: "/assets/generated/gallery-6.dim_600x600.jpg", label: "Bangkok" },
];

const socialLinks = [
  {
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: <Facebook className="w-4 h-4" />,
    label: "Facebook",
    href: "https://facebook.com",
  },
  { icon: <SiX className="w-4 h-4" />, label: "X", href: "https://x.com" },
  {
    icon: <Youtube className="w-4 h-4" />,
    label: "YouTube",
    href: "https://youtube.com",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Components ──────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-coral/30 border-t-coral animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-coral" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-widest font-poppins">
            SUNJTA SAFAR
          </h1>
          <p className="text-white/50 text-sm tracking-wider mt-1">
            Har Safar Ek Kahani
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-coral"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navbar({
  dark,
  setDark,
}: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: "EXPLORE", href: "#explore" },
    { label: "DESTINATIONS", href: "#destinations" },
    { label: "STORIES", href: "#stories" },
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-navy/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <MapPin className="w-5 h-5 text-coral group-hover:scale-110 transition-transform" />
          <span
            className={`font-bold text-lg tracking-wide transition-colors font-poppins ${
              scrolled ? "text-charcoal dark:text-white" : "text-white"
            }`}
          >
            Gunjta Safar
          </span>
        </a>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className={`text-xs font-semibold tracking-widest transition-colors hover:text-coral ${
                scrolled
                  ? "text-charcoal/70 dark:text-white/70"
                  : "text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                ref={searchRef}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 160, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                type="text"
                placeholder="Search..."
                data-ocid="nav.search_input"
                className={`text-sm border rounded-full px-3 py-1 outline-none focus:ring-2 focus:ring-coral/40 overflow-hidden ${
                  scrolled
                    ? "bg-sand dark:bg-navy-deep border-border text-foreground"
                    : "bg-white/20 border-white/30 text-white placeholder-white/60"
                }`}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setSearchOpen((s) => !s)}
            data-ocid="nav.search_input"
            className={`p-2 rounded-full transition-colors hover:bg-white/20 ${
              scrolled ? "text-charcoal dark:text-white" : "text-white"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark/light toggle */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            data-ocid="nav.toggle"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              scrolled
                ? "border-border text-foreground hover:bg-muted"
                : "border-white/30 text-white hover:bg-white/20"
            }`}
          >
            {dark ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className={`md:hidden p-2 ${
              scrolled ? "text-charcoal dark:text-white" : "text-white"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white dark:bg-navy border-t border-border"
          >
            <nav className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold tracking-widest text-charcoal dark:text-white hover:text-coral transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          transform: `translateY(${offset}px)`,
          top: "-10%",
          left: 0,
          right: 0,
          height: "120%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-coral text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4">
            Gunjta Safar
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-light italic mb-3">
            Har Safar Ek Kahani
          </p>
          <p className="text-base sm:text-lg text-white/70 mb-10 font-light tracking-wide">
            Explore the world with us
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#destinations"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.primary_button"
              className="px-8 py-3.5 rounded-full bg-coral text-white font-semibold text-sm tracking-wide shadow-lg hover:bg-coral-dark transition-colors"
            >
              Start Your Journey
            </motion.a>
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.secondary_button"
              className="px-8 py-3.5 rounded-full border-2 border-white/70 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              Discover More
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

function SectionWrapper({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <span className="text-coral text-xs font-semibold tracking-[0.3em] uppercase">
        {tag}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-charcoal dark:text-white mt-2 tracking-tight">
        {title}
      </h2>
      <div className="w-12 h-0.5 bg-coral mx-auto mt-4" />
    </div>
  );
}

function AboutSection() {
  const { ref, visible } = useScrollAnimation();
  return (
    <section id="explore" className="py-20 bg-sand dark:bg-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-coral text-xs font-semibold tracking-[0.3em] uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal dark:text-white mt-2 mb-6 leading-tight">
              Our Story
            </h2>
            <div className="space-y-4 text-foreground/75 leading-relaxed">
              <p>
                Gunjta Safar was born from a single, simple belief: every
                journey holds a story worth telling. What began as a personal
                travel journal grew into a community of passionate wanderers,
                united by their love for discovery and the thrill of the
                unknown.
              </p>
              <p>
                We believe travel is more than sightseeing — it's a conversation
                with the world. Each destination teaches us something new about
                ourselves, about humanity, about the remarkable tapestry of
                cultures that make this planet extraordinary.
              </p>
              <p>
                Our mission is simple: to inspire, guide, and accompany you on
                every step of your journey. Whether you seek the solitude of
                mountain peaks or the warmth of bustling city markets, we're
                here to help you craft memories that last a lifetime.
              </p>
            </div>
            <motion.a
              href="#destinations"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 mt-8 text-coral font-semibold text-sm tracking-wide hover:gap-3 transition-all"
              data-ocid="about.link"
            >
              Explore Destinations <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
          <div className="relative">
            <img
              src="/assets/generated/blog-experience.dim_700x450.jpg"
              alt="Travel adventure"
              className="rounded-2xl w-full object-cover shadow-card-hover h-80 sm:h-96"
            />
            <div className="absolute -bottom-4 -left-4 bg-coral text-white rounded-xl px-5 py-3 shadow-lg">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-xs text-white/80 tracking-wide">
                Destinations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const [search, setSearch] = useState("");
  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section id="destinations" className="py-20 bg-white dark:bg-navy-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionWrapper>
          <SectionHeading tag="Where to go" title="Featured Destinations" />
        </SectionWrapper>

        <SectionWrapper className="mb-10">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              data-ocid="destinations.search_input"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
            />
          </div>
        </SectionWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div
              className="col-span-3 text-center py-16"
              data-ocid="destinations.empty_state"
            >
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No destinations found for "{search}"
              </p>
            </div>
          ) : (
            filtered.map((dest, idx) => (
              <SectionWrapper key={dest.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  data-ocid={`destinations.item.${idx + 1}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
                >
                  <div className="overflow-hidden h-52">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-coral text-xs font-semibold tracking-wide mb-1">
                      <MapPin className="w-3 h-3" />
                      {dest.location}
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {dest.description}
                    </p>
                    <motion.button
                      type="button"
                      whileHover={{ x: 3 }}
                      data-ocid={`destinations.item.${idx + 1}.button`}
                      className="text-coral text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              </SectionWrapper>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="stories" className="py-20 bg-sand dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionWrapper>
          <SectionHeading tag="Travel Stories" title="From the Road" />
        </SectionWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <SectionWrapper key={post.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                data-ocid={`stories.item.${idx + 1}`}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group cursor-pointer"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-coral text-xs font-semibold tracking-wide mb-2">
                    {post.readTime}
                  </p>
                  <h3 className="text-lg font-bold text-card-foreground mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ x: 3 }}
                    data-ocid={`stories.item.${idx + 1}.button`}
                    className="text-coral text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-white dark:bg-navy-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionWrapper>
          <SectionHeading tag="Visual Stories" title="Our Gallery" />
        </SectionWrapper>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={img.src}
              className="gallery-item relative group rounded-xl overflow-hidden"
              data-ocid={`gallery.item.${idx + 1}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 rounded-xl flex items-end">
                <span className="text-white font-semibold text-sm px-4 py-3 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <MapPin className="inline w-3.5 h-3.5 mr-1 text-coral" />
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  }, []);

  return (
    <section id="contact" className="py-20 bg-sand dark:bg-navy">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionWrapper>
          <SectionHeading tag="Get in Touch" title="Say Hello" />
        </SectionWrapper>

        <SectionWrapper>
          <form
            onSubmit={handleSubmit}
            data-ocid="contact.modal"
            className="bg-card rounded-2xl p-8 shadow-card space-y-5"
          >
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="contact.input"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                data-ocid="contact.input"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                data-ocid="contact.textarea"
                placeholder="Tell us about your dream journey..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition resize-none"
              />
            </div>

            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="text-center py-2 text-coral font-semibold text-sm"
              >
                ✓ Message sent! We'll be in touch soon.
              </div>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-ocid="contact.submit_button"
                className="w-full py-3.5 rounded-full bg-coral text-white font-semibold text-sm tracking-wide hover:bg-coral-dark transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </motion.button>
            )}
          </form>
        </SectionWrapper>

        <SectionWrapper className="mt-10">
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -3, scale: 1.1 }}
                data-ocid="contact.link"
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-coral hover:border-coral transition-colors shadow-xs"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const quickLinks = [
    "Destinations",
    "Travel Stories",
    "Gallery",
    "About Us",
    "Contact",
  ];

  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-coral" />
            <span className="font-bold text-white text-lg tracking-wide">
              Gunjta Safar
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            Har Safar Ek Kahani — Every journey, a story. Explore the world with
            us.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-white/50 hover:text-coral transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
            Follow Us
          </h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-coral hover:text-coral transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
            Newsletter
          </h4>
          <p className="text-sm text-white/50 mb-3">
            Get travel inspiration straight to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              data-ocid="footer.input"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-coral transition"
            />
            <button
              type="button"
              data-ocid="footer.submit_button"
              className="px-3 py-2 bg-coral rounded-lg text-white text-sm hover:bg-coral-dark transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {year} Gunjta Safar. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-coral transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    return (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onDone={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-background font-poppins">
          <Navbar dark={dark} setDark={setDark} />
          <main>
            <HeroSection />
            <AboutSection />
            <DestinationsSection />
            <BlogSection />
            <GallerySection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
