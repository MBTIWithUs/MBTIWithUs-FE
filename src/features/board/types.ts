export interface BoardCommentType {
  id: number;
  parentCommentId?: number;
  isAnonymous: boolean;
  content: string;
}

export interface BoardItemType {
  id: number;
  title: string;
  tag: string;
  summary: string;
  nickname: string;
  // like: number;
  views: number;
  thumbnail: string;
  created_at: string;
  updated_at: string | null;
}

export interface BoardListType {
  items: BoardItemType[];
  meta: {
    total_items: number;
    item_count: number;
    item_per_page: number;
    total_pages: number;
    current_page: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
