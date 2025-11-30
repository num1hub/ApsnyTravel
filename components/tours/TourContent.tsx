import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TourContentProps {
  description?: string;
  galleryImages: string[];
}

const markdownComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold text-slate-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-bold text-slate-900" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="text-slate-700" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-slate-700" {...props} />,
};

export function TourContent({ description, galleryImages }: TourContentProps) {
  const trimmedDescription = description?.trim();

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">О туре</h2>
        <div className="prose prose-slate max-w-none text-slate-700">
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
