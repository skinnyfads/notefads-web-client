import useFetch from "./functions/useFetch";
import "./App.css";

interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: number;
  author: string;
}

function App() {
  const serverBaseUrl = "https://adorable-yak-slacks.cyclic.app";
  const { error, data } = useFetch<INote[]>(`${serverBaseUrl}/notes`);
  let content: JSX.Element;

  if (data) {
    content = (
      <div className="content">
        {data.map((note) => {
          return (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <span>{note.author}</span>
              <span>{note.createdAt}</span>
            </div>
          );
        })}
      </div>
    );
  } else if (error) {
    console.log(error);

    content = (
      <div className="content">
        <span>Something went wrong, try to refresh the page</span>
      </div>
    );
  } else {
    content = (
      <div className="content">
        <span>Loading..</span>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>NoteFads</h1>
      </header>
      <main>{content}</main>
    </div>
  );
}

export default App;
