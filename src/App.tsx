import Comments from "./components/Comments/Comments";
import "./App.css";
import CommentForm from "./components/CommentForm/CommentForm";
import { useComments } from "./context/CommentsContext";

const App = () => {
  const { rootComments, handleLike } = useComments();

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Comments</h2>
        <CommentForm
          actionBtnCopy="post"
          onSubmit={(text: string) => console.log(text)}
          key={"Add a new comment"}
        />
        <br />
        <Comments
          handleLike={handleLike}
          comments={rootComments}
          key={new Date().getTime()}
        />
      </div>
    </div>
  );
};

export default App;
