import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../features/store";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ChooseTodos = (): JSX.Element => {
  const mode = useSelector((store: RootState) => store.lightMode.dark);

  const [page, setPage] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setPage(path);
  }, [location]);

  return (
    <ChooseContainer mode={mode} page={page}>
      <Link className="all" to="/">
        All
      </Link>
      <Link className="active" to="/active">
        Active
      </Link>
      <Link className="completed" to="/completed">
        Completed
      </Link>
    </ChooseContainer>
  );
};
export default ChooseTodos;

const ChooseContainer = styled.nav<{ mode: boolean; page: string }>`
  width: 327px;
  height: 48px;
  background-color: ${(props) => (props.mode ? "#25273D" : "white")};
  box-shadow: ${(props) =>
    props.mode
      ? " 0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
      : " 0px 35px 50px -15px rgba(194, 195, 214, 0.5)"};

  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 19px;

  @media (min-width: 1024px) {
    width: 540px;
    gap: 25px;
    height: 64px;

    a:hover {
      color: #494c6b;
    }
  }

  a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: -0.19px;
    color: #9495a5;

    @media (min-width: 1024px) {
      font-size: 16px;
      line-height: 16px;
    }
  }

  .all {
    color: ${(props) => (props.page === "/" ? "#3a7cfd" : "#9495a5")};
  }

  .active {
    color: ${(props) => (props.page === "/active" ? "#3a7cfd" : "#9495a5")};
  }

  .completed {
    color: ${(props) => (props.page === "/completed" ? "#3a7cfd" : "#9495a5")};
  }
`;
