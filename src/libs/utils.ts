export const getNickname = ({
  is_anonymous,
  creator_nickname,
}: {
  is_anonymous: boolean;
  creator_nickname: string;
}) =>
  is_anonymous
    ? '익명'
    : creator_nickname === '<Unknown>'
    ? '삭제된 유저'
    : creator_nickname;

export const getShortNickname = ({
  is_anonymous,
  creator_nickname,
}: {
  is_anonymous: boolean;
  creator_nickname: string;
}) =>
  is_anonymous
    ? '익'
    : creator_nickname === '<Unknown>'
    ? 'U'
    : creator_nickname.at(0);
