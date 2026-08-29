import { NextRequest, NextResponse } from 'next/server';
import { requireAdminUser } from '@/lib/admin-auth';

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const { data: article, error } = await supabase
      .from('articles')
      .select('id, slug, title_pt, content_pt, title_en, content_en, seo_description, cover_image, cover_alt, category_id, is_featured, status, published_at, approved_at, created_at')
      .eq('id', id)
      .single();

    if (error || !article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const { title_pt, content_pt, title_en, content_en, seo_description, slug, cover_image, cover_alt, category_id, is_featured, status, published_at } = body;
    const nextStatus = status === 'scheduled' ? 'scheduled' : status === 'published' ? 'published' : 'draft';
    const validPublishedAt = published_at && !Number.isNaN(Date.parse(published_at))
      ? new Date(published_at).toISOString()
      : null;
    if (nextStatus === 'scheduled' && !validPublishedAt) return NextResponse.json({ error: 'Valid publication date is required' }, { status: 400 });
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    if (!title_pt || !content_pt || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .update({
        slug,
        title_pt,
        content_pt,
        title_en: title_en || '',
        content_en: content_en || '',
        seo_description: seo_description || null,
        cover_image: cover_image || '',
        cover_alt: cover_alt || '',
        category_id: category_id || null,
        is_featured: is_featured ? true : false,
        status: nextStatus,
        published_at: nextStatus === 'published' ? validPublishedAt || new Date().toISOString() : validPublishedAt,
        approved_at: nextStatus === 'scheduled' ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating article:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id, slug });
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
