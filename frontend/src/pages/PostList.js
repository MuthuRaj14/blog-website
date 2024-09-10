import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { Link } from "react-router-dom";
export default function PostList() {
  const [post, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);


  const fetchPost = async () => {
    const response = await axios.get("http://localhost:8000/api/posts");

    setPosts(response.data);
  };


  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:8000/api/categories");

    setCategories(response.data);
  };


  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, []);

  return (
    <>

      <main>
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-8">
              <h1 class="mb-4">Latest Posts</h1>
              {post.length > 0 ? (
                post.map((post) => <Post post={post} />)
              ) : (
                <h3>No posts available</h3>
              )}
            </div>
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">About Me</h5>
                  <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Categories</h5>
                  <ul class="list-group">
                    {categories.map((category)=><li class="list-group-item">
                      <Link to={`/posts/category/${category._id} `} class="text-black">
                        {category.name}
                      </Link>
                    </li>)}
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
