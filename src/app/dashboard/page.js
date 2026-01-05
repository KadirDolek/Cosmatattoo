'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session?.user) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        setUser(session.user);
      }
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-navy/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold text-off-white tracking-wider">
              COSMA<span className="text-hover">TATTOO</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-hover text-black px-6 py-2 rounded-full font-semibold hover:bg-hover/80 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Bienvenue, {user.name || user.email}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-navy/30 dark:border-off-white/30">
            <h2 className="text-2xl font-bold text-foreground mb-6">Mes informations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1 font-medium">Nom</label>
                <p className="text-foreground text-lg">{user.name || 'Non renseigné'}</p>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1 font-medium">Email</label>
                <p className="text-foreground text-lg">{user.email}</p>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1 font-medium">Rôle</label>
                <span className="inline-block bg-hover text-black text-sm font-bold px-4 py-2 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-navy/30 dark:border-off-white/30">
            <h2 className="text-2xl font-bold text-foreground mb-6">Actions rapides</h2>
            <div className="space-y-4">
              <Link
                href="/portfolio"
                className="block bg-navy dark:bg-off-white text-off-white dark:text-navy text-center py-4 rounded-lg font-semibold hover:bg-hover hover:text-black transition-all"
              >
                Voir le Portfolio
              </Link>
              <Link
                href="/#contact"
                className="block bg-navy dark:bg-off-white text-off-white dark:text-navy text-center py-4 rounded-lg font-semibold hover:bg-hover hover:text-black transition-all"
              >
                Prendre Rendez-vous
              </Link>
              <Link
                href="/"
                className="block border-2 border-navy/30 dark:border-off-white/30 text-foreground text-center py-4 rounded-lg font-semibold hover:bg-hover/20 transition-all"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
