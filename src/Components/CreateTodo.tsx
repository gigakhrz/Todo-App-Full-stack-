import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { RootState } from "../features/store";
import { useState } from "react";

// inteface for Todo
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface CreateProps {
  fetchTodos: () => Promise<void>;
}

//   url addres
export const API_BASE_URL = "https://clean-capris-cod.cyclic.app/";

const CreateTodo = ({ fetchTodos }: CreateProps): JSX.Element => {
  const [text, setText] = useState<string>("");

  //   to add todos on server and fetch again
  const addTodo = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      await axios.post<Todo>(`${API_BASE_URL}/todos`, {
        title: text,
        completed: false,
      });
      setText("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  //for lightmode
  const mode = useSelector((store: RootState) => store.lightMode.dark);
  return (
    <Create mode={mode} onSubmit={addTodo}>
      <button type="submit" className="check"></button>
      <input
        id="text1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="createTodo"
        type="text"
        placeholder="Create new todo..."
      />
    </Create>
  );
};

export default CreateTodo;

const Create = styled.form<{ mode: boolean }>`
  width: 327px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 0 14px 20px;
  background-color: ${(props) => (props.mode ? "#25273D" : "white")};
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.mode
      ? " 0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
      : " 0px 35px 50px -15px rgba(194, 195, 214, 0.5)"};

  @media screen and (min-width: 1024px) {
    width: 540px;
    height: 64px;
    padding: 20px 0 20px 24px;
    gap: 24px;
  }
  .check {
    width: 20px;
    height: 20px;
    @media screen and (min-width: 1024px) {
      width: 24px;
      height: 24px;
    }

    border: none;
    background: white;
    border-radius: 50%;
    border: 1px solid rgba(211, 211, 211, 0.7);
    background-color: ${(props) => (props.mode ? "#25273D" : "white")};
  }

  .createTodo {
    width: 100%;
    height: 48px;
    border: none;

    font-family: Josefin Sans;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: -0.17px;
    color: ${(props) => (props.mode ? "#C8CBE7" : "#494c6b")};
    background-color: ${(props) => (props.mode ? "#25273D" : "white")};
    border-radius: 5px;
    @media screen and (min-width: 1024px) {
      font-size: 18px;
      line-height: 18px;
      letter-spacing: -0.25px;
    }
  }

  .createTodo:focus-visible {
    outline: none;
  }
  .createTodo::placeholder {
    color: #9495a5;
    color: ${(props) => (props.mode ? "#9495a5" : "#767992")};
  }
`;
