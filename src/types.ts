import { FormHTMLAttributes } from "react";

export type CommentType = {
  id: string;
  user: string;
  desc: string;
  createdAt: number;
  likes: string[];
  parentId?: string;
  comments?: CommentType[];
};

export type CommentsPropTypes = {
  comments: CommentType[];
  handleLike?: (id: string) => void;
};

export type CommentPropTypes = {
  comment: CommentType;
  handleLike?: (id: string) => void;
};

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export type CommentFormPropsType = {
  loading?: boolean;
  actionBtnCopy: string;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onSubmit: (text: string) => void;
  handleCancel?: () => void;
} & Omit<FormProps, "onSubmit" | "action" | "method">;
