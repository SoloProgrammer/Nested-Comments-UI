import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CommentType } from "../types";
import initialComments from "../data/data.json";

export const USER_ID = "user76142";

type CommentsContextPropsType = {
  rootComments: CommentType[];
  getReplies: (id: string) => CommentType[];
  handleLike: (id: string) => void;
};

export const CommentsContext = createContext<CommentsContextPropsType | null>(
  null
);

export const CommentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  const getComments = (comments: CommentType[]) => {
    let groupByParentId: { [key: string]: CommentType[] } = {};

    comments.forEach((c) => {
      groupByParentId[c.parentId ?? "root"] ||= [];
      groupByParentId[c.parentId ?? "root"].push(c);
    });

    return groupByParentId;
  };

  const groupByComments = useMemo(() => getComments(comments), [comments]);

  function handleLike(id: string) {
    setComments((prev) =>
      prev.map((c: CommentType) => {
        if (c.id === id) {
          if (c.likes.includes(USER_ID)) {
            c.likes = c.likes.filter((uId) => uId !== USER_ID);
          } else c.likes.push(USER_ID);
        }
        return c;
      })
    );
  }

  const getReplies = useCallback(
    (id: string) => {
      return groupByComments[id];
    },
    [groupByComments]
  );

  return (
    <CommentsContext.Provider
      value={{ rootComments: getReplies("root"), getReplies, handleLike }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () =>
  useContext(CommentsContext) as CommentsContextPropsType;
