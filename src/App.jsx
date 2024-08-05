import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Persons from "./routes/Persons.jsx";
import Root from "./routes/Root.jsx";
import Users from "./routes/Users.jsx";
import Posts from "./routes/Posts.jsx";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: "Rowlings", title: "CEO", age: 33, location: "Nairobi" },
    {
      id: 2,
      name: "Irene",
      title: "Business Analyst",
      age: 35,
      location: "Edmonton",
    },
    { id: 3, name: "dennis", title: "Architect", age: 37, location: "London" },
  ]);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const togglePostStatus = async (id, currentStatus) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      const updatedPost = { ...response.data, published: !currentStatus };

      await axios.put(`http://localhost:3000/posts/${id}`, updatedPost);

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/persons", element: <Persons persons={persons} /> },
        { path: "/users", element: <Users users={users} /> },
        {
          path: "/posts",
          element: <Posts posts={posts} togglePostStatus={togglePostStatus} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
