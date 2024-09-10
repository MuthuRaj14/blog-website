import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../components/Post"; // Assuming you have a Post component for individual post rendering

export default function PostList() {
  const [posts, setPosts] = useState([]); // Fixed the typo (post -> posts)
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/category/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [id]);

  return (
    <main>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="mb-4">
              {categories.find(category => category._id === id)?.name || "Category"}
            </h1>

            {posts.length > 0 ? (
              posts.map(post => (
                <div className="card mb-4" key={post._id}>
                  <div className="row">
                    <div className="col-sm-12 col-md-3">
                      <img
                        className="img-fluid h-100 card-img-top"
                        src={post.imageUrl || "https://via.placeholder.com/800x400"}
                        alt={post.title}
                      />
                    </div>
                    <div className="card-body col-md-8">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.description}</p>
                      <a href={`/posts/${post._id}`} className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available in this category.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
