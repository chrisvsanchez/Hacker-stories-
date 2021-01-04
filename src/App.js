import "./App.css";
import React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://react.js.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const useSemiPersistentState = (key) => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || "");
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
  };
  const [value, setValue] = useSemiPersistentState();
  const handleSearch = (e) => {
    setValue(e.target.value);
    // localStorage.setItem("search", e.target.value);
  };
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id="search" search={value} onInputChange={handleSearch}>
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const List = ({ list }) =>
  list.map((item) => <Item key={item.objectID} {...item} />);

const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);
const InputWithLabel = ({ id, label, value, onInputChange, type = "text" }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
};
export default App;
