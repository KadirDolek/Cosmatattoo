'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDrawings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session?.user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchDrawings();
    }
  }, [session]);

  const fetchDrawings = async () => {
    try {
      const response = await fetch('/api/drawings');
      const data = await response.json();
      setDrawings(data.drawings || []);
    } catch (error) {
      console.error('Error fetching drawings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', formData.file);
      form.append('title', formData.title);
      form.append('description', formData.description);

      const response = await fetch('/api/drawings', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        setFormData({ title: '', description: '', file: null });
        document.getElementById('fileInput').value = '';
        fetchDrawings();
        alert('Dessin ajouté avec succès !');
      } else {
        alert('Erreur lors de l\'ajout du dessin');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce dessin ?')) return;

    try {
      const response = await fetch(`/api/drawings?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchDrawings();
        alert('Dessin supprimé');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Chargement...</div>
      </div>
    );
  }

  if (session?.user?.role !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-navy/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold text-off-white tracking-wider">
              COSMA<span className="text-hover">TATTOO</span> <span className="text-sm">Admin</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                href="/admin"
                className="text-off-white hover:text-hover transition-colors"
              >
                Messages
              </Link>
              <Link
                href="/admin/images"
                className="text-off-white hover:text-hover transition-colors"
              >
                Images
              </Link>
              <Link
                href="/admin/drawings"
                className="text-hover font-semibold"
              >
                Dessins
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-hover text-black px-6 py-2 rounded-full font-semibold hover:bg-hover/80 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">
          Gestion des Dessins
        </h1>

        {/* Formulaire d'upload */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-navy/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ajouter un dessin</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">Titre *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-navy/30 text-white focus:outline-none focus:border-hover transition-colors"
                placeholder="Nom du dessin"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-navy/30 text-white focus:outline-none focus:border-hover transition-colors resize-none"
                placeholder="Description du dessin (optionnel)"
              ></textarea>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Image *</label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-navy/30 text-white focus:outline-none focus:border-hover transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-hover hover:bg-hover/80 text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Upload en cours...' : 'Ajouter le dessin'}
            </button>
          </form>
        </div>

        {/* Liste des dessins */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-navy/30">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Dessins ({drawings.length})
          </h2>

          {drawings.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              Aucun dessin. Ajoutez-en un ci-dessus !
            </p>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {drawings.map((drawing) => (
                <div
                  key={drawing.id}
                  className="relative group bg-accent/10 rounded-xl overflow-hidden border-2 border-navy/30"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={drawing.imageUrl}
                      alt={drawing.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">{drawing.title}</h3>
                    {drawing.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {drawing.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(drawing.id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
