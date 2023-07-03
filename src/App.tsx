import { styled } from "styled-components";
import bgLight from "./assets/bg-mobile-light.jpg";
import bgDark from "./assets/bg-mobile-dark.jpg";
import bgLDesktop from "./assets/bg-desktop-light.jpg";
import bgDDesktop from "./assets/bg-desktop-dark.jpg";
import GlobalStyles from "./GlobalStyles";
import { useSelector } from "react-redux";
import { RootState } from "./features/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import CreateTodo from "./Components/CreateTodo";
import { Todo as TodoInterface } from "./Components/CreateTodo";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./Components/CreateTodo";
import Todo from "./Components/Todo";
import ActiveTodos from "./Components/ActiveTodos";
import CompletedTodos from "./Components/ComletedTodos";

function App() {
  const mode = useSelector((store: RootState) => store.lightMode.dark);
  const [data, setData] = useState<TodoInterface[]>([]);

  const fetchTodos = async (): Promise<void> => {
    try {
      const response = await axios.get<TodoInterface[]>(
        `${API_BASE_URL}/todos`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Container mode={mode}>
        <Header />
        <TodoContainer>
          <CreateTodo fetchTodos={fetchTodos} />
          <Routes>
            <Route
              path="/"
              element={<Todo tasks={data} fetchTodos={fetchTodos} />}
            />
            <Route
              path="/active"
              element={<ActiveTodos tasks={data} fetchTodos={fetchTodos} />}
            />
            <Route
              path="/completed"
              element={<CompletedTodos tasks={data} fetchTodos={fetchTodos} />}
            />
          </Routes>
        </TodoContainer>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.main<{ mode: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  background-image: url(${(props) => (props.mode ? bgDark : bgLight)});
  background-repeat: no-repeat;
  background-size: 100% 200px;
  padding-top: 48px;
  background-color: ${(props) => (props.mode ? "#25273D" : " #FAFAFA;")};

  @media screen and (min-width: 1024px) {
    background-image: url(${(props) => (props.mode ? bgDDesktop : bgLDesktop)});
    background-size: 100% 300px;
    padding-top: 70px;
  }
`;

const TodoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;
