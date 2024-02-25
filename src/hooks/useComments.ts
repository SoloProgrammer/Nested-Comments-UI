import { useMemo, useState } from "react";
import { CommentType } from "../types";
import initialComments from "../data/data.json";
import { USER_ID } from "../context/CommentsContext";

export const useComments = () => {
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
    const copy = structuredClone(comments);

    copy.map((c: CommentType) => {
      if (c.id === id) {
        if (c.likes.includes(USER_ID)) {
          c.likes = c.likes.filter((uId) => uId !== USER_ID);
        } else c.likes.push(USER_ID);
      }
    });
    setComments(copy);
  }

  const getReplies = (id: string) => {
    console.log("getReplies called");
    return groupByComments[id];
  };

  console.log(comments);

  return {
    getReplies,
    setComments,
    handleLike,
    comments,
  };
};
