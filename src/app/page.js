'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeSelector from '@/components/ThemeSelector';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setContactStatus({ type: 'success', message: 'Message envoyé avec succès !' });
        setContactForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setContactStatus({ type: '', message: '' }), 5000);
      } else {
        setContactStatus({ type: 'error', message: 'Erreur lors de l\'envoi du message' });
      }
    } catch (error) {
      setContactStatus({ type: 'error', message: 'Erreur lors de l\'envoi du message' });
    }
  };

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  // Intersection Observer pour les animations au scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-animate');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      {/* Background fixe avec effet parallaxe */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-navy via-accent to-black opacity-5 dark:opacity-10"></div>
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-hover/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-navy/20 rounded-full blur-3xl"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold text-off-white tracking-wider">
              COSMA<span className="text-hover">TATTOO</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#accueil" className="text-off-white hover:text-hover transition-colors">Accueil</a>
              <Link href="/portfolio" className="text-off-white hover:text-hover transition-colors">Portfolio</Link>
              <Link href="/dessins" className="text-off-white hover:text-hover transition-colors">Dessins</Link>
              <a href="#services" className="text-off-white hover:text-hover transition-colors">Services</a>
              <a href="#contact" className="text-off-white hover:text-hover transition-colors">Contact</a>
              <Link href="/auth/login" className="text-off-white hover:text-hover transition-colors">Connexion</Link>

              {/* Theme Selector */}
              <div className="ml-4">
                <ThemeSelector />
              </div>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <ThemeSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-off-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy/98 backdrop-blur-sm border-t border-off-white/10">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#accueil"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </a>
              <Link
                href="/portfolio"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/dessins"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dessins
              </Link>
              <a
                href="#services"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                href="/auth/login"
                className="block text-off-white hover:text-hover transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-accent to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-off-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-off-white mb-6 animate-fade-in">
            L'Art Tatoué sur Peau
          </h1>
          <p className="text-xl md:text-2xl text-off-white/90 mb-8 font-light">
            Transformez votre corps en œuvre d'art unique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="bg-off-white text-navy px-8 py-4 rounded-full font-semibold hover:bg-hover hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl">
              Prendre Rendez-vous
            </a>
            <a href="#portfolio" className="border-2 border-off-white text-off-white px-8 py-4 rounded-full font-semibold hover:bg-hover hover:text-black hover:border-hover transition-all duration-300 transform hover:scale-105">
              Voir le Portfolio
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background scroll-animate">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nos Services</h2>
            <div className="w-24 h-1 bg-hover mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-navy/10 dark:border-off-white/10 scroll-animate">
              <div className="w-16 h-16 bg-navy dark:bg-off-white rounded-full flex items-center justify-center mb-6 group-hover:bg-hover transition-colors">
                <svg className="w-8 h-8 text-off-white dark:text-navy group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-3">Tatouage Custom</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Création personnalisée selon vos idées. Chaque tatouage est unique et conçu spécialement pour vous.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-navy/10 dark:border-off-white/10 scroll-animate">
              <div className="w-16 h-16 bg-navy dark:bg-off-white rounded-full flex items-center justify-center mb-6 group-hover:bg-hover transition-colors">
                <svg className="w-8 h-8 text-off-white dark:text-navy group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-3">Cover & Rework</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Recouvrement et amélioration de tatouages existants pour leur donner une nouvelle vie.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-navy/10 dark:border-off-white/10 scroll-animate">
              <div className="w-16 h-16 bg-navy dark:bg-off-white rounded-full flex items-center justify-center mb-6 group-hover:bg-hover transition-colors">
                <svg className="w-8 h-8 text-off-white dark:text-navy group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-3">Design & Conseil</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Consultation gratuite pour affiner votre projet et créer le design parfait ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="py-20 bg-navy dark:bg-black scroll-animate">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-off-white mb-4">Portfolio</h2>
            <div className="w-24 h-1 bg-hover mx-auto mb-6"></div>
            <p className="text-off-white/80 text-lg max-w-2xl mx-auto">
              Découvrez quelques-unes de nos réalisations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link key={item} href="/portfolio" className="group relative aspect-square bg-accent/20 rounded-xl overflow-hidden cursor-pointer block">
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="text-hover font-semibold text-lg">Voir plus</span>
                </div>
                {/* Placeholder pour images */}
                <div className="w-full h-full bg-gradient-to-br from-accent to-navy/80 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-16 h-16 text-off-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Bouton voir tout le portfolio */}
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block bg-hover text-black px-8 py-4 rounded-full font-semibold hover:bg-hover/80 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Voir tout le Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Drawings Preview Section */}
      <section id="dessins" className="py-20 bg-background scroll-animate">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nos Dessins</h2>
            <div className="w-24 h-1 bg-hover mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Découvrez nos créations originales et inspirez-vous pour votre futur tatouage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link key={item} href="/dessins" className="group relative aspect-square bg-accent/20 rounded-xl overflow-hidden cursor-pointer block border-2 border-navy/30 dark:border-off-white/30 hover:border-hover transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="text-hover font-semibold text-lg">Voir plus</span>
                </div>
                {/* Placeholder pour dessins */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 dark:from-gray-800 to-gray-300 dark:to-gray-900 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-16 h-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Bouton voir tous les dessins */}
          <div className="text-center mt-12">
            <Link
              href="/dessins"
              className="inline-block bg-hover text-black px-8 py-4 rounded-full font-semibold hover:bg-hover/80 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Voir tous les Dessins
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-navy dark:bg-black scroll-animate">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Notre Processus</h2>
            <div className="w-24 h-1 bg-hover mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Discussion de votre projet et de vos attentes' },
              { step: '02', title: 'Design', desc: 'Création du design personnalisé' },
              { step: '03', title: 'Validation', desc: 'Approbation du design final' },
              { step: '04', title: 'Réalisation', desc: 'Tatouage dans les meilleures conditions' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-hover/40 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-navy to-black scroll-animate">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-off-white mb-4">Contactez-nous</h2>
            <div className="w-24 h-1 bg-hover mx-auto mb-6"></div>
            <p className="text-off-white/80 text-lg">
              Prêt à concrétiser votre projet ? Prenez rendez-vous dès maintenant
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            {contactStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                contactStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-off-white' :
                contactStatus.type === 'error' ? 'bg-red-500/20 border border-red-500/50 text-off-white' :
                'bg-blue-500/20 border border-blue-500/50 text-off-white'
              }`}>
                {contactStatus.message}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-off-white mb-2 font-medium">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-off-white mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-off-white mb-2 font-medium">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-off-white mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors resize-none"
                  placeholder="Décrivez votre projet de tatouage..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={contactStatus.type === 'loading'}
                className="w-full bg-hover hover:bg-hover/80 text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactStatus.type === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-hover rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-off-white">+33 6 12 34 56 78</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hover rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-off-white">contact@cosmatattoo.fr</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hover rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-off-white">Paris, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-off-white mb-4 md:mb-0">
              <span className="font-bold text-xl">COSMA<span className="text-hover">TATTOO</span></span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-off-white hover:text-hover transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-off-white hover:text-hover transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div className="text-off-white/60 text-sm">
              © 2026 Cosma Tattoo. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
    </ThemeProvider>
  );
}
