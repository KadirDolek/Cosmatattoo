'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue');
        return;
      }

      router.push('/auth/login?registered=true');
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-accent to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-off-white mb-2">
              COSMA<span className="text-hover">TATTOO</span>
            </h1>
          </Link>
          <p className="text-off-white/80">Créer votre compte</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-navy/30">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-off-white">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-off-white mb-2 font-medium">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-off-white mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-off-white mb-2 font-medium">Téléphone (optionnel)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div>
              <label className="block text-off-white mb-2 font-medium">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-off-white mb-2 font-medium">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-off-white/20 text-off-white placeholder-off-white/50 focus:outline-none focus:border-hover transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-hover hover:bg-hover/80 text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-off-white/60">
              Déjà un compte ?{' '}
              <Link href="/auth/login" className="text-hover hover:underline font-semibold">
                Se connecter
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-off-white/60 hover:text-hover transition-colors text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
