import { makeAutoObservable } from "mobx"
import { API_URL_OK } from "../config";

class AppStore {
    isOpenedMenu: boolean = false;
    activeUrl: string = API_URL_OK(0);

    constructor() {
        makeAutoObservable(this);
    }

    setActiveUrl = (url: string) => {
        this.activeUrl = url;
    }

    setIsOpenedMenu = (isOpened: boolean) => {
        this.isOpenedMenu = isOpened;
    }
}

export default new AppStore;