import React from 'react';
import clsx from 'clsx';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TourContentProps {
  description?: string;
  galleryImages: string[];
}

const markdownComponents: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={clsx(
        'mt-6 text-2xl font-bold text-slate-900 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={clsx(
        'mt-6 text-xl font-bold text-slate-900 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={clsx(
        'mt-5 text-lg font-semibold text-slate-900 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={clsx(
        'text-base leading-relaxed text-slate-700',
        'mt-4 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={clsx('font-semibold text-slate-900', className)} {...props} />
  ),
  em: ({ className, ...props }) => (
    <em className={clsx('text-slate-800', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={clsx(
        'mt-4 list-disc space-y-2 pl-5 text-slate-700 marker:text-slate-400 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={clsx(
        'mt-4 list-decimal space-y-2 pl-5 text-slate-700 marker:text-slate-400 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={clsx('leading-relaxed text-slate-700', className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={clsx(
        'font-semibold text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-800',
        className
      )}
      {...props}
    />
  ),
  hr: (props) => <hr className="my-6 border-slate-200" {...props} />,
};

export function TourContent({ description, galleryImages }: TourContentProps) {
  const trimmedDescription = description?.trim();

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">О туре</h2>
        <div className="space-y-4 text-slate-700">
          {trimmedDescription ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {trimmedDescription}
            </ReactMarkdown>
          ) : (
            <p className="text-slate-500">Описание скоро появится.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">Фотогалерея</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {galleryImages.map((img, idx) => (
            <img
              key={img + idx}
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="h-48 w-full rounded-lg object-cover transition-opacity hover:opacity-90"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
