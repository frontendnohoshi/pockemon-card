import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import animeService from "../../services/animeService";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import { setAnimePage } from "./homePageSlice";
import { HotAnime } from "./hotAnime";

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page)),
});

const HomePage = (props: IHomePageProps) => {
  const { setAnimePage } = actionDispatch(useDispatch());

  const fetchAnimePage = useCallback(async () => {
    const animePage = await animeService.getAnimePage(0).catch((err) => {
      console.log("エラー内容: ", err);
    });
    console.log("アニメページ: ", animePage);
    if (animePage) {
      setAnimePage(animePage);
    }
  }, [setAnimePage]);

  useEffect(() => {
    fetchAnimePage();
  }, [fetchAnimePage]);

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime />
    </Container>
  );
};

export default HomePage;
