export interface BoardCommentType {
  id: number;
  parent_comment_id: number | null;
  is_anonymous: boolean;
  content: string;
  created_at: string;
  creator_id: number;
  creator_nickname: string;
  likes: number;
  updated_at: string | null;
}

export interface BoardItemType {
  id: number;
  title: string;
  tag: string;
  summary: string;
  creator_nickname: string;
  likes: number;
  views: number;
  is_anonymous: boolean;
  thumbnail: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface BoardDetailType {
  id: number;
  title: string;
  content: string;
  tag: string;
  summary: string;
  thumbnail: string | null;
  views: number;
  comments: BoardCommentType[];
  created_at: string;
  updated_at: string | null;
  creator_nickname: string;
  is_anonymous: boolean;
  likes: number;
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
