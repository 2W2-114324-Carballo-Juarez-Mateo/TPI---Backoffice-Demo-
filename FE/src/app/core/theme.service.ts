import { Injectable, signal } from '@angular/core';

export type ArcadeTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'tup-arcade-theme';
  readonly currentTheme = signal<ArcadeTheme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
  }

  toggleTheme(): void {
    const nextTheme: ArcadeTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(nextTheme);
    this.applyTheme(nextTheme);
    try {
      localStorage.setItem(this.storageKey, nextTheme);
    } catch {
      // Ignorar restricciones en entornos aislados
    }
  }

  setTheme(theme: ArcadeTheme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // Ignorar restricciones en entornos aislados
    }
  }

  private getInitialTheme(): ArcadeTheme {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'dark'; // Tema oscuro por defecto para estética arcade
  }

  private applyTheme(theme: ArcadeTheme): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
