export interface StrapiResponse<T> {
    data: T[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  
  export interface StrapiSingleResponse<T> {
    data: T;
    meta: Record<string, unknown>;
  }

  // Image format interface
  export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Image formats collection interface
export interface ImageFormats {
  thumbnail: ImageFormat;
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
}

// Cover image interface
export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Author interface
export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Category interface
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Shared rich text component interface
export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

// Shared quote component interface
interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  title: string;
  body: string;
}

// Shared media component interface
export interface MediaBlock {
  __component: "shared.media";
  id: number;
}

// Shared slider component interface
export interface SliderBlock {
  __component: "shared.slider";
  id: number;
}

// Union type for all possible content blocks
export type ContentBlock = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;
  
  export interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    cover?: Cover;
    author?: Author;
    category?: Category;
    blocks?: ContentBlock[];
  }