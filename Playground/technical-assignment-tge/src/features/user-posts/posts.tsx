import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import ExpandableRow from "../users-list/expandableRow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { chosenUserId, chosenUser, usersPosts, loadUser, loadUserPosts } from "../shared/usersSlice";
import styled from "styled-components";

const Posts = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(chosenUserId);
  const userData = useAppSelector(chosenUser);
  const postsData = useAppSelector(usersPosts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    dispatch(loadUser(userId));
    dispatch(loadUserPosts(userId));
  }, []);



  return(<div>
    {userData && Object.keys(userData).length ? <ExpandableRow userInfo={userData} defaultExpanded={true} disableCollapse/> : null}
    {/* PostsWrap */}
    <PostsWrap>
      {postsData && postsData.length > 0 && postsData.map((post: any) => (
        <PostContainer key={post.id}>
          <title>{post.title}</title>
          <section>{post.body}</section>
        </PostContainer>
      ))}
    </PostsWrap>
  </div>)
}

export default Posts;

const PostsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 200px;
  background-color: blanchedalmond;
  border: 1px solid black;

  title {
    display: block;
    border-bottom: 1px solid black;
    font-size: 16px;
    font-weight: bold;
  }
`;

