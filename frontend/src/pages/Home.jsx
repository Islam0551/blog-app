import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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

    </div>
  )
}