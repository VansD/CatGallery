import { PhotoType } from "../models/Photo"
import { makeAutoObservable } from "mobx"

class PhotoStore {
    photos: PhotoType[] = [];
    currentPage: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setPhotos = (photos: PhotoType[]) => {
        this.photos = [...this.photos, ...photos];
    }

    clearPhotos = () => {
        this.photos = [];
    }

    setCurrentPage = (page: number) => {
        this.currentPage = page;
    }
}

export default new PhotoStore;