import '../App.css';
import Navbar from './Navbar.js'
import AllWallpapers from './AllWallpapers.js'
import React, { useEffect, useState } from 'react';

function App() {

  const [deviceType, setDeviceType] = useState(1);

  const [limit, setLimit] = useState(8);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    let pullingSubs;
    // Checking to see what device was requested and from what subreddits to pull from
    checkDeviceType();

    // limit will be divided by 2, has to be even number
    const halfedLimit = limit / 2

    // Fetching data from Reddit API's
    Promise.all(pullingSubs.map(url =>
      fetch(url + halfedLimit)
        .then(checkStatus)
        .then(parseJSON)
        .catch(error => console.log("THERE WAS AN ERROR" + error))
    ))
      .then(data => {
        let postsCollector = []
        // combines all posts from all subreddits being pulled from
        for (let i = 0; i < data[0].data.children.length; i++) {
          postsCollector.push(data[0].data.children[i], data[1].data.children[i]);
        }
        console.log(data[1].data.children[0]);
        setPosts(postsCollector);
        console.log(data[0].data.children.length)
      })

    // checking to see if fetch was successfull
    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }
    // Parsing data to JSON
    function parseJSON(response) {
      return response.json();
    }
    // Checking device and setting the subreddits to pull from
    function checkDeviceType() {
      if (deviceType === 1) {
        pullingSubs = ["https://www.reddit.com/r/wallpapers.json?limit=", "https://www.reddit.com/r/wallpaper.json?limit="];
      }
      else if (deviceType === 2) {
        pullingSubs = ["https://www.reddit.com/r/iphonewallpapers.json?limit=", "https://www.reddit.com/r/iWallpaper.json?limit="];
      }
    }

  }, [limit, deviceType]);

  // increasing the amount of posts being loaded
  const onLoadMoreHandler = () => {
    setLimit(prev => (prev + 8));
    return;
  }

  return (
    <div className="App">
      <Navbar deviceType={deviceType} setDeviceType={setDeviceType} />
      <AllWallpapers posts={posts} onLoadMore={onLoadMoreHandler} deviceType={deviceType} />
    </div>
  )
}

export default App;
