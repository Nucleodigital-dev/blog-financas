import { NextResponse } from 'next/server';
import { requireAdminUser } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { user } = await requireAdminUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { text, targetLang } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const langpair = targetLang === 'en' ? 'pt|en' : 'en|pt';
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
    );
    
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      return NextResponse.json({ translatedText: data.responseData.translatedText });
    } else {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
