'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
      fetchMessages();
    }
  }, [session]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchMessages();
        alert('Message supprimé');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter.toUpperCase();
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'UNREAD').length,
    read: messages.filter(m => m.status === 'READ').length,
    archived: messages.filter(m => m.status === 'ARCHIVED').length
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
                className="text-hover font-semibold"
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
                className="text-off-white hover:text-hover transition-colors"
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Dashboard Admin
          </h1>
          <Link
            href="/"
            className="border-2 border-navy/30 dark:border-off-white/30 text-foreground px-6 py-2 rounded-full font-semibold hover:bg-hover/20 transition-all"
          >
            Retour au site
          </Link>
        </div>

        {/* Statistiques */} 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-navy/30">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-blue-500/50">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Non lus</p>
            <p className="text-3xl font-bold text-blue-500">{stats.unread}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-green-500/50">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Lus</p>
            <p className="text-3xl font-bold text-green-500">{stats.read}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-500/50">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Archivés</p>
            <p className="text-3xl font-bold text-gray-500">{stats.archived}</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex gap-4">
          {['all', 'unread', 'read', 'archived'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === f
                  ? 'bg-hover text-black'
                  : 'bg-white dark:bg-gray-900 text-white border-2 border-navy/30 hover:bg-hover/20'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'unread' ? 'Non lus' : f === 'read' ? 'Lus' : 'Archivés'}
            </button>
          ))}
        </div>

        {/* Liste des messages */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-navy/30 text-center">
              <p className="text-gray-600 dark:text-gray-400">Aucun message</p>
            </div>
          ) : (
            filteredMessages.map(message => (
              <div
                key={message.id}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl border-2 transition-all ${
                  message.status === 'UNREAD'
                    ? 'border-blue-500/50'
                    : message.status === 'READ'
                    ? 'border-green-500/50'
                    : 'border-gray-500/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{message.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{message.email}</p>
                    {message.phone && (
                      <p className="text-gray-600 dark:text-gray-400">{message.phone}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={message.status}
                      onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 border-2 border-navy/30 text-foreground focus:outline-none focus:border-hover"
                    >
                      <option value="UNREAD">Non lu</option>
                      <option value="READ">Lu</option>
                      <option value="ARCHIVED">Archivé</option>
                    </select>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
                      title="Supprimer le message"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-yellow-300 mb-4">{message.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(message.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
