import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import IPost from "../shared/interfaces/IPosts";
import { updateUserPosts } from "../shared/usersSlice";
import ConfirmationPopUp from "../shared/components/confirmationPopUp";

interface PostProps {
  data: IPost;
  index: number;
  userId: number;
  postsData: Array<IPost>
}

const Post = ({data, userId, index, postsData}: PostProps) => {
  const dispatch = useAppDispatch();
  const { register, watch, handleSubmit, formState: { dirtyFields, errors }} = useForm();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [postToDelete, setPostToDelete]: any = useState(undefined);
  const [editInProgress, setEditInProgress]: any = useState(undefined);
  const {id, body, title} = data;

  const handleEditPost = () => {
    if (!Object.values(dirtyFields).includes(true)) {
      setEditInProgress(false);
      return;
    }
    
    const [title, body] = watch(["title", "body"]);
    const postInfo: IPost = {...data};
    postInfo.title = title;
    postInfo.body = body;
  
    const updatedPostData: Array<IPost> = Array.from(postsData);
    updatedPostData.splice(index, 1, postInfo);

    setEditInProgress(false);
    dispatch(updateUserPosts({userId, posts: updatedPostData}));
  };

  const handleDeleteBtnClick = (postId: number) => {
    setShowConfirmationPopup(true);
    setPostToDelete(postId);
  };

  const deletePostIfConfirmed = (isConfermed: boolean) => {
    if (isConfermed && userId) {
      const updatedPostData: Array<IPost> = postsData.filter((post: IPost) => post.id !== postToDelete);
      dispatch(updateUserPosts({userId, posts: updatedPostData}));
      setShowConfirmationPopup(false);
    } else {
      setShowConfirmationPopup(false);
    }
  }

  useEffect(() => {
    return () => {
      setEditInProgress(false);
    }
  }, [])

  return (
    <>
      <PostWrap key={id}>
        <DeleteButton onClick={() => handleDeleteBtnClick(id)}>x</DeleteButton>

        <title>
          {editInProgress ?
            <textarea className="title" defaultValue={title} {...register("title", { required: true })} /> :
            title}
          {errors["title"] && <span className="error-msg">This field is required</span>}
        </title>

        <section>
          {editInProgress ?
            <textarea className="section" defaultValue={body} {...register("body", { required: true })} /> :
          body}
          {errors["body"] && <span className="error-msg">This field is required</span>}
        </section>

       <footer>
          { editInProgress && <span onClick={handleSubmit(handleEditPost)}>Complete</span>}
          { !editInProgress && <span onClick={() => setEditInProgress(true)}>Edit post</span>}
        </footer>
      </PostWrap>

      {showConfirmationPopup && <ConfirmationPopUp checkIfConfirmed={deletePostIfConfirmed}/>}
    </>
  )
}

export default Post;

const PostWrap = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    position: relative;
    width: 450px;
    padding-top: 10px;
    box-shadow: silver 0px 0px 15px;
    margin: 30px;

    .error-msg {
      position: absolute;
      color: red;
      font-size: 12px;
    }

  title {
    display: block;
    position: relative;
    border-bottom: 1px solid black;
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
    box-shadow: black 0px 5px 13px;
    padding: 10px;

    .error-msg {
      top: 14px;
      left: 14px;
      font-weight: normal;
    }
  }

  textarea {
    position: relative;
    height: 100%;
    width: 100%;

    .error-msg {
      bottom: 14px;
      left: 14px;
    }
  }

  > section {
    padding: 10px;
    min-height: 100px;
  }

  footer {
    font-family: cursive;
    text-align: right;
    padding-right: 15px;
    padding-bottom: 5px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      text-shadow: 0 0 1px black;
    }
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: red;
    text-shadow: 0 0 2px red;
  }
`;