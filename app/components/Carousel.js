import React from "react";
import { Image } from "react-native-elements";
import Carouse from "react-native-snap-carousel";

export default function Carousel(props) {
  const { arrayImages, height, width } = props;

  const renderImagenes = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };

  return (
    <Carouse
      layout={"default"}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderImagenes}
    />
  );
}
