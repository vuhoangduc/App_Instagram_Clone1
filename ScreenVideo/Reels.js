import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SingleReel from './SingleReel';

const Reels = ({ baiviet }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = ({index}) => {
    setCurrentIndex(index);
  }

  return (
    <SwiperFlatList
      data={baiviet}
      vertical={true}
      onChangeIndex={()=>handleIndexChange}
      index={currentIndex}
      renderItem={({ item, index }) => (
        <SingleReel ListItem={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  )
}

export default Reels