import React from 'react';
import youtube from "./api/youtube";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  }

  onSearchSubmit = async term => {
    const { data: { items: videos } } = await youtube.get("/search", { params: { q: term } });
    this.setState({ videos, selectedVideo: videos[0] })
  }

  onSelectVideo = selectedVideo => {
    this.setState({ selectedVideo });
  }

  render() {
    const { videos, selectedVideo } = this.state;
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column" >
              {selectedVideo && <VideoDetail video={selectedVideo} />}
            </div>
            <div className="five wide column" >
              <VideoList videos={videos} onVideoSelect={this.onSelectVideo} />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default App;
