import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import IPost from "../shared/interfaces/IPosts";
import { updateUserPosts } from "../shared/usersSlice";
import ConfirmationPopUp from "../shared/components/confirmationPopUp";

interface PostProps {
  data: IPost;
  userId: number;
  index: number;
  postsData: Array<IPost>
}

const Post = ({data, userId, index, postsData}: PostProps) => {
  const dispatch = useAppDispatch();
  const { register, watch, formState: { dirtyFields } } = useForm();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [postToDelete, setPostToDelete]: any = useState(undefined);
  const [postToEdit, setPostToEdit]: any = useState(undefined);
  const {id, body, title} = data;

  const handleEditPost = (id: number) => {
    console.log('dirtyFields: ', dirtyFields);

    const [title, body] = watch(["title", "body"]);
    const postInfo: IPost = {...data};
    postInfo.title = title;
    postInfo.body = body;
  
    const updatedPostData: Array<IPost> = Array.from(postsData);
    updatedPostData.splice(index, 1, postInfo);

    dispatch(updateUserPosts({id: userId, posts: updatedPostData}));
  };

  const handleDeleteBtnClick = (postId: number) => {
    setShowConfirmationPopup(true);
    setPostToDelete(postId);
  };

  const deletePostIfConfirmed = (isConfermed: boolean) => {
    if (isConfermed && userId) {
      const updatedPostData: Array<IPost> = postsData.filter((post: IPost) => post.id !== postToDelete);
      dispatch(updateUserPosts({id: userId, posts: updatedPostData}));
      setShowConfirmationPopup(false);
    } else {
      setShowConfirmationPopup(false);
    }
  }

  return (
    <PostWrap key={id}>
            <DeleteButton onClick={() => handleDeleteBtnClick(id)}>x</DeleteButton>
              <title>{
                postToEdit !== id ?
                title :
                  <textarea className="title" defaultValue={title} {...register("title", { required: true })} />
              }</title>

              <section>{
                postToEdit !== id ?
                body :
                  <textarea className="section" defaultValue={body} {...register("body", { required: true })} />
              }</section>

              <footer>
                {postToEdit === id && <span onClick={() => handleEditPost(id)}>Complete</span>}
                {postToEdit !== id && <span onClick={() => setPostToEdit(id)}>Edit post</span>}
              </footer>
        {showConfirmationPopup && <ConfirmationPopUp checkIfConfirmed={deletePostIfConfirmed}/>}
          </PostWrap>
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

  title {
    display: block;
    border-bottom: 1px solid black;
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
    box-shadow: black 0px 5px 13px;
    padding: 10px;
  }

  textarea {
    height: 100%;
    width: 100%;
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

  &:hover {
    color: red;
    text-shadow: 0 0 2px red;
  }
`;