import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom'
import SlideShow from './components/Slideshow'
import { GlobalProvider } from './context/GloabalContext'
import Home from './pages/Home'
import Share from './pages/Share'

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Home />
    },
    {
      path: "/stats",
      element: <SlideShow />
    },
    {
      path: "/share/:username",
      element: <Share />
    },
  ])

  return (
    <div className='bg-black'>
      <div className='max-w-[1400px] mx-auto bg-black relative'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/stats' element={<SlideShow />} />
              <Route path='/share' element={<Share />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}

export default App
