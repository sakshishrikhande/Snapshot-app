
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=>{
    const params = {
      method : "flickr.photos.search",
      api_key : "6888754a0a17a15d4a1da21ef4e9b84a",
      text : searchText,
      sort: "",
      per_page: 40,
      license : '4',
      extras : "owner_name, license",
      format : "json",
      nojsoncallback : 1
    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=>{
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=>{
        return fetchFlickrImageUrl(imgData, 'q');

      });
      setImageData(arr);

    }).catch(()=>{

    }).finally(()=>{

    })
    
    
  },[searchText])

  const fetchFlickrImageUrl = (photo, size)=>{
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <div className="App">
      <i><header className='snapshot'>SnapShot</header></i>
     <input onChange={(e)=>{searchData.current = e.target.value} }/>
     <button className='button' onClick={()=>{setSearchText(searchData.current)}}>search</button>
     <section className='buttons'>
        <button className='button' onClick={()=> {setSearchText("mountains")}}>Mountains</button>
        <button className='button' onClick={()=> {setSearchText("beaches")}}>Beaches</button>
        <button className='button' onClick={()=> {setSearchText("birds")}}>Birds</button>
        <button className='button' onClick={()=> {setSearchText("foods")}}>Food</button>
     </section>
     <section className='image-container'>
     
          {imageData.map((imageurl,key) =>{
            return (
              <article className='flickr-image'>
              <img src={imageurl} key={key}/>
              </article>
            )
            
            
          })}
       
     </section>
    </div>
  );
}

export default App;
