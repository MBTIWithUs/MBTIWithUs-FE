export interface BoardItemType {
  id: number;
  title: string;
  content: string;
  nickname: string;
  like: number;
  reply_cnt: number;
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
