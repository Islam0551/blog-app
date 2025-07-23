import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
  let navigate = useNavigate()
  let [image,setImage] =useState(null)
  let [title, setTitle] = useState('')
  let [content,setContent] = useState('')

  const handleImageChange = (e)=>{
    let file = e.target.files[0]

    if(file){
      setImage(file)
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('title',title)
    formData.append('content',content)
    if(image) formData.append('image',image)

    try{
      let token = localStorage.getItem('token') 
      await axios.post('http://localhost:8000/api/addPost',formData,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Пост сәтті құрылды!")
      navigate('/home')
    }catch(err){
      alert('Пост құру сәтсіз аяқталды!')
      console.error(err.message);
    }
  }  
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/home')}
          className="text-sm text-white hover:text-white transition"
        >
          ←
        </button>
        <h1 className="text-xl font-light">Жаңа пост қосу</h1>
        <div className="w-8"></div> {/* Баланс үшін бос элемент */}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Тақырып"
            required
            className="w-full p-2 border-b focus:outline-none focus:border-black"
          />
        </div>
        
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Мазмұны"
            rows="4"
            className="w-full p-2 border-b focus:outline-none focus:border-black"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-500">Сурет қосу (міндетті емес)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="w-full text-sm"
          />
        </div>
        
        {/* {preview && (
          <div className="mt-2">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-60 object-contain border"
            />
          </div>
        )}
         */}
        <button
          type="submit"
          className="w-full py-2 bg-black text-white hover:bg-gray-800 transition"
        >
          Постты жариялау
        </button>
      </form>
    </div>
  )
}