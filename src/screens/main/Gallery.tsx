import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDeviceOrientation } from '@react-native-community/hooks';

import { Photo } from './PhotoItem';
import { PhotoType } from '../../models/Photo';
import { observer } from 'mobx-react-lite';
import photoStore from "../../stores/photo";
import { ModalPhoto } from './ModalPhoto';
import { get } from '../../helpers/request';
import background from "../../resources/background.jpg";
import { EmptyData } from '../../components/EmptyData';

export const Gallery = observer((): React.JSX.Element => {
  const { photos, setPhotos, currentPage, setCurrentPage, clearPhotos } = photoStore;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const MemoizedPhoto = memo((Photo));
  const orientation = useDeviceOrientation();

  const getPhotos = () => {
    // 1. Ресурс не доступен
    //let url = `https://api.pexels.com/v1/search?query=nature`;
    
    // 2. Ресурс не найден
    //let url = `https://api.thecatapi12.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&page=${currentPage}&limit=10`;

    // 3. Ok
    let url = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&page=${currentPage}&limit=10`;

    get<PhotoType[]>(url,
      (response) => { setPhotos(response.data), setCurrentPage(currentPage + 1) },
      () => {setIsFirstLoading(false)}
    )
  }

  useEffect(() => {
    getPhotos()
    setIsFirstLoading(false)
  }, [])

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  }

  if (isFirstLoading)
    return <ActivityIndicator />
  
  if (photos.length === 0)
    return <EmptyData />

  return <View style={styles.content}>
    <ImageBackground source={background}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => { clearPhotos(), getPhotos() }} />
          }
          data={photos}
          keyExtractor={(item, i) => item.id + i}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          horizontal={false}
          numColumns={2} //todo: landscape? на лету нельзя менять
          refreshing={true}
          onEndReached={() => photos.length > 0 && getPhotos()}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
              <MemoizedPhoto title={item.title} url={item.url} page={currentPage} index={index} />
            </TouchableOpacity>
          )}
          removeClippedSubviews={true}
          viewabilityConfig={viewabilityConfig}
        //ListEmptyComponent={isFirstLoading  ? <ActivityIndicator/> : <EmptyData/> } todo: работает неправильно
        />
    </ImageBackground>
    <ModalPhoto index={selectedImageIndex} close={() => setSelectedImageIndex(null)} />

  </View>
})

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  content: {
    display: "flex",
    justifyContent: "space-around"
  }
});