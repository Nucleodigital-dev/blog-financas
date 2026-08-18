import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { requireAdminUser } from '@/lib/admin-auth';

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ error: 'File must be 5 MB or smaller' }, { status: 413 });
    }

    const ext = ALLOWED_TYPES.get(file.type);
    if (!ext) {
      return NextResponse.json({ error: 'Only JPEG, PNG and WebP images are allowed' }, { status: 415 });
    }

    const fileName = `${uuidv4()}${ext}`;
    const filePath = `${user.id}/${fileName}`;
    const { error } = await supabase.storage.from('article-images').upload(filePath, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('article-images').getPublicUrl(filePath);
    const url = data.publicUrl;
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
