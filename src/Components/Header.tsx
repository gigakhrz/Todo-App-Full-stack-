import styled from "styled-components";
import logo from "../assets/TODO.png";
import sun from "../assets/icon-sun.svg";
import mun from "../assets/icon-moon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDark } from "../features/darkModeSlice";
import { RootState } from "../features/store";

const Header = (): JSX.Element => {
  const mode = useSelector((store: RootState) => store.lightMode.dark);
  const dispatch = useDispatch();
  const handleSetMode = (): void => {
    dispatch(setDark(!mode));
  };

  return (
    <HeaderContainer>
      <img className="logo" src={logo} alt="logo img" />
      <img
        className="light"
        onClick={handleSetMode}
        src={mode ? sun : mun}
        alt=""
      />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 327px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 1024px) {
    width: 540px;
  }

  .logo {
    @media screen and (min-width: 1024px) {
      width: 167px;
      height: 40px;
    }
  }

  .light {
    @media screen and (min-width: 1024px) {
      cursor: pointer;
    }
  }
`;
