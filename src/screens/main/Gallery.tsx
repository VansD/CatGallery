import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { Photo } from './PhotoItem';
import { PhotoType } from '../../models/Photo';
import { observer } from 'mobx-react-lite';
import photoStore from "../../stores/photo";
import appStore from "../../stores/app";
import { ModalPhoto } from './ModalPhoto';
import { get } from '../../helpers/request';
import background from "../../resources/background.jpg";
import { EmptyData } from '../../components/EmptyData';
import { PHOTO_WIDTH_WITH_MARGIN } from '../../config';
import { Loader } from '../../components/Loader';

export const Gallery = observer((): React.JSX.Element => {
  const { photos, setPhotos, currentPage, setCurrentPage, clearPhotos } = photoStore;
  const { isOpenedMenu, activeUrl, setActiveUrl, setIsOpenedMenu } = appStore;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const numColumns = Math.floor(Dimensions.get("window").width / (PHOTO_WIDTH_WITH_MARGIN + 20));

  const getPhotos = () => {
    // Доступны ссылки:
    // API_URL_OK - успешный запрос, используется с параметром currentPage
    // API_URL_NOT_ACCESS - доступ заблокирован
    // API_URL_NOT_FOUND - страница не найдена

    get<PhotoType[]>(activeUrl,
      (response) => { setPhotos(response.data), setCurrentPage(currentPage + 1) },
      () => { clearPhotos() }
    )
  }

  useEffect(() => {
    getPhotos()
    setIsFirstLoading(false)
  }, [numColumns, activeUrl])

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  }

  const renderItem = useCallback((item: PhotoType, index: number) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
      <Photo title={item.title} url={item.url} page={currentPage} index={index} />
    </TouchableOpacity>
  ), [])

  if (isFirstLoading)
    return <Loader />

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
        getItemLayout={(data, index) => (
          { length: PHOTO_WIDTH_WITH_MARGIN, offset: PHOTO_WIDTH_WITH_MARGIN * index, index }
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        horizontal={false}
        numColumns={numColumns}
        key={numColumns}
        refreshing={true}
        onEndReached={() => photos.length > 0 && getPhotos()}
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => renderItem(item, index)}
        removeClippedSubviews={true}
        viewabilityConfig={viewabilityConfig}
        ListFooterComponent={<Loader />}
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