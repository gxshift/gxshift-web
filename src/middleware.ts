import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 1. Dapatkan sesi login saat ini
  const { data: { session } } = await supabase.auth.getSession();
  
  const path = request.nextUrl.pathname;

  // 2. Proteksi Halaman Dashboard
  if (path.startsWith('/admin') || path.startsWith('/user') || path.startsWith('/gamers')) {
    // Jika belum login, tendang ke login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Ambil Role pengguna dari tabel profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const role = profile?.role;

    // 3. Logika Pintu Masuk (Clearance Check)
    if (path.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user', request.url));
    }
    
    if (path.startsWith('/gamers') && role !== 'GAMERS') {
      return NextResponse.redirect(new URL('/user', request.url));
    }

    if (path.startsWith('/user') && role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    if (path.startsWith('/user') && role === 'GAMERS') {
      return NextResponse.redirect(new URL('/gamers', request.url));
    }
  }

  // 4. Cegah user yang sudah login untuk membuka halaman login
  if (path === '/login' && session) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    if (profile?.role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url));
    if (profile?.role === 'GAMERS') return NextResponse.redirect(new URL('/gamers', request.url));
    return NextResponse.redirect(new URL('/user', request.url));
  }

  return response;
}

// Hanya jalankan middleware ini pada route tertentu untuk menghemat resource
export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/gamers/:path*', '/login'],
};