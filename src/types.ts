export interface Note {
  id?: string;
  text: string;
  name: string;
  ts: number;
}

export interface Suggestion {
  id?: string;
  title: string;
  why: string;
  name: string;
  type: 'book' | 'movie';
  ts: number;
}

export interface Submission {
  id?: string;
  type: 'playlist' | 'fitness' | 'quote' | string;
  value: string;
  name: string;
  ts: number;
}

export interface BlogPost {
  title: string;
  date: string;
  snippet: string;
  url: string;
}

export type DesignFolder = 'designs' | 'ui' | 'content' | 'app' | 'motion' | 'brand';
