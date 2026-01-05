import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

// GET - Récupérer tous les dessins
export async function GET() {
  try {
    const drawings = await prisma.drawing.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ drawings });
  } catch (error) {
    console.error('Error fetching drawings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des dessins' },
      { status: 500 }
    );
  }
}

// POST - Ajouter un nouveau dessin (Admin uniquement)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description') || null;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'Fichier et titre requis' },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer et le sauvegarder
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer un nom de fichier unique
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);

    // Écrire le fichier
    await writeFile(filepath, buffer);

    // Créer l'entrée dans la base de données
    const drawing = await prisma.drawing.create({
      data: {
        title,
        description,
        imageUrl: `/uploads/${filename}`,
        publicId: filename
      }
    });

    return NextResponse.json({ drawing }, { status: 201 });
  } catch (error) {
    console.error('Error creating drawing:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du dessin' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un dessin (Admin uniquement)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    // Récupérer le dessin pour obtenir le chemin du fichier
    const drawing = await prisma.drawing.findUnique({
      where: { id }
    });

    if (!drawing) {
      return NextResponse.json(
        { error: 'Dessin non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le fichier
    if (drawing.publicId) {
      const filepath = join(process.cwd(), 'public', 'uploads', drawing.publicId);
      try {
        await unlink(filepath);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }

    // Supprimer l'entrée de la base de données
    await prisma.drawing.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Dessin supprimé' });
  } catch (error) {
    console.error('Error deleting drawing:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du dessin' },
      { status: 500 }
    );
  }
}
