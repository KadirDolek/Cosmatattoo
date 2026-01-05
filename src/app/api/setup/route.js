import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: 'Un administrateur existe déjà',
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name
        }
      }, { status: 200 });
    }

    // Créer l'admin
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@cosmatattoo.fr',
        name: 'Administrateur',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({
      message: 'Administrateur créé avec succès !',
      admin: {
        email: admin.email,
        name: admin.name,
        id: admin.id
      },
      credentials: {
        email: 'admin@cosmatattoo.fr',
        password: 'admin123'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'admin', details: error.message },
      { status: 500 }
    );
  }
}
