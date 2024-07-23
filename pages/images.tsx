import { useFetch } from 'atomic-utils'

type ImageType = { imageUrl: string }

const ImagesPage = () => {
  const { data: images, loading } = useFetch<ImageType[]>('/api/get-images', {
    onError(error) {
      console.log('Error fetching images:', error)
    }
  })

  if (loading) {
    return <p>Loading images...</p>
  }


  const reversedImages = images.slice().reverse()

  return (
    <div className='md:max-w-2xl w-3/4 mx-auto'>
      <h1 className='text-3xl mb-5'>All Generated Images</h1>
      <div className='flex flex-wrap gap-5'>
        {reversedImages.length > 0 ? (
          reversedImages.map((img, index) => (
            <div key={index} className='w-full md:w-1/2 lg:w-1/3'>
              <img
                src={img.imageUrl}
                alt={`Generated Image ${index + 1}`}
                className='w-full h-auto rounded-lg'
              />
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  )
}

export default ImagesPage
