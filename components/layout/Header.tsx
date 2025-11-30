import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/about', label: 'О гиде' },
    { href: '/contacts', label: 'Контакты' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-teal-800" onClick={closeMenu}>
          <Mountain className="h-6 w-6" />
          <span>ApsnyTravel</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-teal-600',
                location.pathname === link.href ? 'text-teal-600' : 'text-slate-600'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link to="/catalog">Выбрать тур</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium text-slate-700 hover:text-teal-600"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full" onClick={closeMenu}>
              <Link to="/catalog">Выбрать тур</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}