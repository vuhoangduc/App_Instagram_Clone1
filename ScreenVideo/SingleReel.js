import { View, Text, Dimensions, TouchableOpacity    } from 'react-native';
import React, { useRef } from 'react';
// import Video from 'react-native-video';
import { Audio, Video } from 'expo-av';
// import { Constants } from 'react-native';
import Constants from 'expo-constants';
// import VideoPlayer from 'react-native-video-controls';
const SingleReel = ({ ListItem }) => {
  console.log(ListItem);
  const Windowwidth = Dimensions.get('window').width;
  const Windowheight = Dimensions.get('window').height;
  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log('buffring');
  };

  return (
    <View style={{ width: Windowwidth, height: Windowheight }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      >
          <Video
            ref={videoRef}
            source={{ uri: ListItem.link_url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            onBuffer={onBuffer}
            onError={(err) => console.log(err)}
          />
        <Text style={{color:'white'}}>{ListItem.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleReel;