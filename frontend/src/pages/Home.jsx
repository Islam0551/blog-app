import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  let [posts,setPosts]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/api/posts')
    .then(response=>{
        console.log(response.data)
        setPosts(response.data)
    })
    .catch(err=>{
        console.error('Error fetching posts: ',err.message);
    })
  },[])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Үстіңгі панель */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-thin tracking-wide mb-2">Барлық посттар</h1>
        <Link 
          to="/add-post"
          className="
            inline-block 
            border 
            border-gray-400 
            px-6 py-2 
            rounded-full 
            hover:bg-gray-100 
            transition-all
            text-sm
          "
        >
          Пост қосу +
        </Link>
      </div>

      {/* Posts list */}
      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center py-12 text-gray-400">Посттар жоқ</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h2 className="text-lg font-medium mb-1">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.content}</p>
              
              {post.image && (
                <div className="my-3">
                  <img
                    src={`http://localhost:8000/uploads/${post.image}`}
                    alt="post content"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              
              <div className="text-xs text-gray-400">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}