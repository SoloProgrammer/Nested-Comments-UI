import CommentTextArea from "react-textarea-autosize";
import styles from "./commentForm.module.css";
import { CommentFormPropsType } from "../../types";
import { FormEvent, useState } from "react";

const CommentForm = ({
  loading = false,
  actionBtnCopy,
  autoFocus = false,
  handleSubmit,
  handleCancel,
  placeholder = "",
  value = "",
  ...props
}: CommentFormPropsType) => {
  const [text, setText] = useState(value);

  return (
    <form
      {...props}
      className={styles.commentForm}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit(text);
      }}
    >
      <CommentTextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={(e) => e.target.setSelectionRange(value.length, value.length)}
        autoFocus={autoFocus}
        maxRows={10}
        minRows={4}
        placeholder={placeholder}
        className={`${styles.textarea}`}
      />
      <div className={styles.submit}>
        <button
          className={styles.cancelBtn}
          onClick={handleCancel || (() => setText(""))}
          type="button"
        >
          {handleCancel ? `cancel` : "clear"}
        </button>
        <button disabled={loading} type="submit">
          {loading ? "loading..." : actionBtnCopy}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
