import { useEffect, useRef, useState } from "react";
import styles from "./comments.module.css";
import { FaEdit, FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import { BsReply, BsReplyFill } from "react-icons/bs";
import autoAnimate from "@formkit/auto-animate";
import IconBtn from "../Icons/IconBtn";
import { MdDelete } from "react-icons/md";
import CommentForm from "../CommentForm/CommentForm";
import { CommentPropTypes, CommentsPropTypes } from "../../types";
import { USER_ID } from "../../App";
import { useComments } from "../../context/CommentsContext";

const dateForamtter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

const Comments = ({ comments, handleLike }: CommentsPropTypes) => {
  return (
    <div className={styles.container}>
      <div className={styles.comments}>
        {comments?.map((comment) => (
          <Comment handleLike={handleLike} key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const Comment = ({ comment, handleLike }: CommentPropTypes) => {
  const [open, setOpen] = useState(false);

  const [showTextArea, setShowTextArea] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const { getReplies, handleLike: handleCommentLike } = useComments();

  const replies = getReplies(comment.id);

  return (
    <div className={styles.wrapper} ref={parent}>
      <div className={styles.commentBox}>
        <div className={styles.top}>
          <span className={styles.user}>{comment.user}</span>
          <span>{dateForamtter.format(comment.createdAt)}</span>
        </div>
        <div className={styles.desc}>
          {isEdit ? (
            <CommentForm
              value={comment.desc}
              actionBtnCopy="save"
              handleCancel={() => setIsEdit(false)}
              handleSubmit={() => {}}
              autoFocus
              key={"edit comment"}
            />
          ) : (
            comment.desc
          )}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <IconBtn
            aria-label="like-button"
            className={`${styles.likes}`}
            handleClick={() => handleCommentLike(comment.id)}
            Icon={comment.likes.includes(USER_ID) ? FaHeart : FaRegHeart}
          >
            <span className={styles.count}>{comment.likes.length}</span>
          </IconBtn>
          <IconBtn
            aria-label="reply-button"
            className={styles["fz-medium"]}
            handleClick={() => setShowTextArea(!showTextArea)}
            Icon={showTextArea ? BsReplyFill : BsReply}
          />
          <IconBtn
            handleClick={() => setIsEdit((prev) => !prev)}
            aria-label="edit-button"
            Icon={isEdit ? FaEdit : FaRegEdit}
          />
          <IconBtn
            aria-label="delete-button"
            className={styles["fz-medium"]}
            color="danger"
            Icon={MdDelete}
          />
        </div>
      </div>
      {showTextArea && (
        <CommentForm
          autoFocus
          placeholder="Add your reply"
          handleCancel={() => setShowTextArea(false)}
          aria-label="Add reply form"
          handleSubmit={() => {}}
          actionBtnCopy="post"
          key={new Date().getTime()}
        />
      )}
      {replies && !open && (
        <button className={styles.showReplyBtn} onClick={() => setOpen(true)}>
          view replies
        </button>
      )}
      {open && replies && (
        <div className={styles.children}>
          <button
            onClick={() => setOpen(false)}
            className={styles["collapse-line"]}
          />
          {replies?.map((c) => (
            <Comments handleLike={handleLike} key={c.id} comments={replies!} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
