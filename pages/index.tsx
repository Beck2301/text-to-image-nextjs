import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import { mutateData, useBlob } from 'http-react'

const IAimageGenerate = () => {
  const [prompt, setPrompt] = useState<string>('')

  const { data, loading, refresh } = useBlob('/api/generate-image', {
    auto: false,
    objectURL: true,
    default:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
    query: {
      prompt
    }
  })

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value)
  }

  function resetImage() {
    mutateData([
      'GET /api/generate-image',
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
    ])
  }

  return (
    <div className='md:max-w-2xl w-3/4'>
      <h1 className='text-3xl'>Generated Image for Prompt:</h1>
      <div className='my-5 flex gap-5 justify-center'>
        <input
          type='text'
          placeholder='Enter your prompt'
          value={prompt}
          onChange={handlePromptChange}
          className='bg-transparent border-b w-full'
        />
        <button onClick={resetImage}>Reset</button>
        <button
          onClick={refresh}
          className='bg-white p-3 text-black rounded-lg flex items-center'
          disabled={loading}
        >
          {loading && (
            <FaSpinner className='animate-spin h-5 w-5 mr-2 text-black' />
          )}
          {loading ? 'Generating' : 'Generate'}
        </button>
      </div>
      {data && (
        <div>
          <p>Generated Image:</p>
          <img
            src={data}
            alt='Generated Image'
            style={{ display: 'block', userSelect: 'none' }}
            className='w-full mt-5 rounded-lg'
          />
        </div>
      )}
    </div>
  )
}

export default IAimageGenerate