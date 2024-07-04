import { useState, useEffect } from "react"
import Stock from "../elements/stock"
import Stocks from "../../utils/stock"

const Main = () => {
  const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState(0)
  const [customImageSrc, setCustomImageSrc] = useState()

  useEffect(() => {
    setStocks([...Stocks])
  }, [])

  const handleFileChangeImage = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        let src = reader.result
        if (src.split(':')[1].split('/')[0] !== 'image') return
        setCustomImageSrc(src)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileAddStock = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        let src = reader.result
        if (src.split(':')[1].split('/')[0] !== 'image') return
        let tempStocks = stocks
        tempStocks.splice(0, 0, { src: src })
        console.log(tempStocks)
        setStocks([...tempStocks])
        setSelectedStock(0)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="main-page relative">
      <div className="main-container py-10 px-16">
        <div className="flex image-face-swap">
          <div className="swap-container w-[685px] py-5 px-10">
            <div className="flex w-full p-4">
              <div className="cursor-pointer active-image face-swap">Face Swap</div>
            </div>
            <div className="swap-content h-[300px] flex py-8 px-7 gap-7">
              <div className="swap-left w-[260px] bg-gray-100 rounded-2xl flex justify-around items-center">
                <div className="custom text-center">
                  <div onChange={handleFileChangeImage} className="custom-image w-[90px] h-[90px] mb-3 relative">
                    <input id="inputFileImage" type="file" accept="image/*" className="opacity-0 w-[90px] h-[90px] cursor-pointer" />
                    {
                      customImageSrc &&
                      <>
                        <img src={customImageSrc} alt="custom" className="w-[inherit] absolute top-0 h-[inherit] rounded-xl object-cover" />
                        <img onClick={() => { document.getElementById('inputFileImage').click() }} src="assets/edit-icon.png" alt="edit tool icon" className="absolute top-[-5%] right-[-5%] w-6 h-6 cursor-pointer"></img>
                      </>
                    }
                  </div>
                  <span>{customImageSrc ? 'Source Face' : 'Add Face'}</span>
                </div>
                <div className="w-4 h-4 absolute mb-8 right-arrow"></div>
                <div className="original text-center">
                  <div className='original-image w-[90px] h-[90px] mb-3 bg-gray-300 rounded-xl'>
                    <img className="w-full h-full object-cover rounded-xl" src={stocks.length && stocks[0] && stocks[selectedStock].src} alt="original" />
                  </div>
                  <span>Original</span>
                </div>
              </div>
              <div className='swap-right w-[260px] bg-gray-100 rounded-2xl'
              >
                <img className="w-full h-full object-cover rounded-2xl" src={stocks.length && stocks[0] && stocks[selectedStock].src} alt="original" />
              </div>
            </div>
            <div className={customImageSrc ? "swap-button active bg-[#d8d8d8] mt-6 p-6 rounded-lg text-center text-white" : "swap-button bg-[#d8d8d8] mt-6 p-6 rounded-lg text-center text-white"}>
              Generate
            </div>
          </div>
          <div className="stock-container w-[455px] h-[495px] overflow-auto bg-gray-100">
            <div className="stock-content py-8 px-8">
              <div className="stock-title">
                Upload a photo or select from templates to reface
              </div>
              <div className="stock-body py-6">
                <div className="stocks flex flex-wrap gap-5 overflow-auto">
                  <div onChange={handleFileAddStock} className="bg-gray-50 w-[113px] h-[113px] rounded-lg add-image">
                    <input type="file" accept="image/*" className="opacity-0 w-[113px] h-[113px] cursor-pointer" />
                  </div>
                  {
                    stocks.map((stock, key) => {
                      return (
                        <Stock key={key} func={() => setSelectedStock(key)} className={key === selectedStock ? 'bg-gray-50 w-[113px] h-[113px] rounded-lg cursor-pointer active' : 'bg-gray-50 w-[113px] h-[113px] rounded-lg cursor-pointer'}
                          style={stock.src}></Stock>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="video-face-swap">
          <div className="swap-container px-10 py-5">
            <div className="flex w-full p-4">
              {/* <div className="cursor-pointer active-image face-swap">Video Face Swap</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main