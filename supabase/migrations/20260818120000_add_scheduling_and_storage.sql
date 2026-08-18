alter table public.articles add column if not exists published_at timestamptz;
alter table public.articles add column if not exists approved_at timestamptz;
update public.articles set published_at = created_at where status = 'published' and published_at is null;
alter table public.articles drop constraint if exists articles_status_check;
alter table public.articles add constraint articles_status_check check (status in ('draft', 'scheduled', 'published'));
alter table public.articles add constraint articles_scheduled_requires_approval check (status <> 'scheduled' or (approved_at is not null and published_at is not null));
create index if not exists articles_scheduled_publication_idx on public.articles (published_at) where status = 'scheduled';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('article-images', 'article-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Authenticated users manage article images" on storage.objects;
create policy "Authenticated users manage article images" on storage.objects for all to authenticated
using (bucket_id = 'article-images') with check (bucket_id = 'article-images');
