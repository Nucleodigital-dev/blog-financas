import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { requireAdminUser } from '@/lib/admin-auth';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, slug, title_pt, title_en, cover_image, cover_alt, category_id, is_featured, status, published_at, approved_at, created_at')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { title_pt, content_pt, title_en, content_en, seo_description, slug, cover_image, cover_alt, category_id, is_featured, status, published_at } = body;
    const nextStatus = status === 'scheduled' ? 'scheduled' : status === 'published' ? 'published' : 'draft';
    if (nextStatus === 'scheduled' && (!published_at || Number.isNaN(Date.parse(published_at)))) return NextResponse.json({ error: 'Valid publication date is required' }, { status: 400 });
    
    if (!title_pt || !content_pt || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = uuidv4();
    const { error } = await supabase.from('articles').insert({
      id,
      slug,
      title_pt,
      content_pt,
      title_en: title_en || '',
      seo_description: seo_description || null,
      content_en: content_en || '',
      cover_image: cover_image || '',
      cover_alt: cover_alt || '',
      category_id: category_id || null,
      is_featured: is_featured ? true : false,
      status: nextStatus,
      published_at: nextStatus === 'published' ? new Date().toISOString() : published_at || null,
      approved_at: nextStatus === 'scheduled' ? new Date().toISOString() : null
    });
    
    if (error) {
      console.error('Error saving article:', error);
      if (error.code === '23505') {
         return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, id, slug });
  } catch (error: any) {
    console.error('Error saving article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
