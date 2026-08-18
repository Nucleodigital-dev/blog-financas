import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { requireAdminUser } from '@/lib/admin-auth';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: categories, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { name_pt, name_en, slug, parent_id, config_json } = body;
    
    if (!name_pt || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = uuidv4();
    const { error } = await supabase.from('categories').insert({
      id,
      name_pt,
      name_en: name_en || '',
      slug,
      parent_id: parent_id || null,
      config_json: config_json || null
    });
    
    if (error) {
      console.error('Error saving category:', error);
      if (error.code === '23505') {
         return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, id, slug });
  } catch (error: any) {
    console.error('Error saving category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
