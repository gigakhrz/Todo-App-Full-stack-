import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import check from "../assets/icon-check.svg";
import { styled } from "styled-components";
import ChooseTodos from "./ChooseTodos";
import { API_BASE_URL } from "./CreateTodo";
import axios from "axios";

// /

interface TodoInterface {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoProps {
  tasks: TodoInterface[];

  fetchTodos: () => Promise<void>;
}

const Todo = ({ tasks, fetchTodos }: TodoProps): JSX.Element => {
  //for lightmode
  const mode = useSelector((store: RootState) => store.lightMode.dark);

  //marking todo as comlpeted or as active
  const updateTodo = async (_id: string, completed: boolean) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${_id}`, { completed });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // delete only comleted
  const deleteCompleted = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteCompleted`);
    } catch (error) {
      console.log(error, "some error");
    }
  };

  // delete one todo
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // how many active items left
  const actives = (tasks as TodoInterface[]).filter(
    (task) => task.completed === false
  );
  const itemsLeft = actives.length;

  return (
    <Cont>
      <Ulcontainer $task={tasks} mode={mode}>
        {tasks.map((task, index) => (
          <TaskDiv $mode={mode} $done={task.completed} key={index}>
            <li className="todo">
              <div
                className="isDone"
                onClick={() => {
                  updateTodo(task._id, !task.completed);
                }}
              >
                <img className="check" src={check} alt="" />
              </div>
              <p>{task.title}</p>

              <svg
                className="delete-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                onClick={() => deleteTodo(task._id)}
              >
                <path
                  fill="#494C6B"
                  fillRule="evenodd"
                  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
            </li>
            <hr />
          </TaskDiv>
        ))}
        <Count mode={mode}>
          <p className="left">{itemsLeft} items left</p>
          <button
            onClick={() => {
              deleteCompleted();
              fetchTodos();
            }}
          >
            Clear completed
          </button>
        </Count>
      </Ulcontainer>
      {tasks.length > 0 ? <ChooseTodos /> : null}
    </Cont>
  );
};

export default Todo;

const Cont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TaskDiv = styled.div<{ $mode: boolean; $done: boolean }>`
  // Rest of the component code...

  width: 327px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.$mode ? "#25273D" : "white")};
  border-radius: 5px;
  @media (min-width: 1024px) {
    width: 540px;
  }

  hr {
    border: none;
    height: 1px;
    width: 100%;
    background-color: ${(props) => (props.$mode ? "#393A4B" : "#E3E4F1")};
  }

  .isDone {
    width: 20px;
    height: 20px;
    @media (min-width: 1024px) {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(211, 211, 211, 0.7);
    cursor: pointer;
    background: ${(props) =>
      props.$done ? "linear-gradient(135deg, #55ddff 0%, #c058f3 100%)" : ""};
    img {
      display: ${(props) => (props.$done ? "flex" : "none")};
    }
  }

  .isDone:hover {
    border: 1px solid #c058f3;
  }

  p {
    text-decoration: ${(props) => (props.$done ? "line-through" : "")};
    color: ${(props) =>
      props.$done
        ? props.$mode
          ? "#4D5067"
          : "#D1D2DA"
        : props.$mode
        ? "#C8CBE7"
        : "#494c6b"};
  }
`;

const Ulcontainer = styled.div<{
  $task: TodoInterface[];
  mode: boolean;
}>`
  display: ${(props) => (props.$task.length === 0 ? "none" : "flex")};
  width: 327px;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.mode ? "#25273D" : "white")};
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.mode
      ? "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
      : "0px 35px 50px -15px rgba(194, 195, 214, 0.5)"};

  .todo {
    display: flex;
    width: 327px;
    height: 48px;
    align-items: center;
    width: 100%;
    gap: 24px;
    padding: 16px 20px;
    background-color: ${(props) => (props.mode ? "#25273D" : "white")};
    border-radius: 5px;
    @media screen and (min-width: 1024px) {
      width: 540px;
      gap: 24px;
      padding: 20px 24px;
      height: 64px;
    }

    &:hover {
      svg.delete-icon {
        display: block;
        cursor: pointer;
      }
    }

    p {
      width: 78%;
      font-size: 12px;
      font-weight: 400;
      line-height: 12px;
      letter-spacing: -0.17px;

      @media screen and (min-width: 1024px) {
        font-size: 18px;
        line-height: 18px;
        letter-spacing: -0.25px;
        cursor: pointer;
      }
    }
  }

  svg {
    width: 18px;
    height: 18px;

    @media (max-width: 768px) {
      transform: scale(0.67);
    }
    @media (min-width: 1024px) {
      display: none;
    }
  }
`;

const Count = styled.div<{ mode: boolean }>`
  width: 327px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.mode ? "#25273D" : "white")};
  box-shadow: ${(props) =>
    props.mode
      ? "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
      : "0px 35px 50px -15px rgba(194, 195, 214, 0.5)"};
  border-radius: 5px;
  padding: 0 20px;
  @media screen and (min-width: 1024px) {
    width: 540px;
    height: 64px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.19px;
    color: ${(props) => (props.mode ? "#9495A5" : "#5B5E7E")};
    @media screen and (min-width: 1024px) {
      font-size: 14px;
      line-height: 14px;
      letter-spacing: -0.194px;
    }
  }

  button {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.167px;
    color: ${(props) => (props.mode ? "#9495A5" : "#5B5E7E")};
    background-color: transparent;
    border: none;
    cursor: pointer;

    @media screen and (min-width: 1024px) {
      font-size: 14px;
      line-height: 14px;
      letter-spacing: -0.19px;
    }
  }
`;
