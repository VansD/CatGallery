import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-native";

//todo: add headers and other methods...
export async function get<T>(url: string, callback: (response: AxiosResponse<T, any>) => void, finallyCallback?: () => void | undefined) {
  try {
    let result = await axios.get<T>(url, {
      validateStatus: function (status) {
        return status < 500;
      }
    })
    callback(result)

  } catch (error: any) {
    if (error?.response?.status == 522)
      Alert.alert("Предупреждение!", "Сайт недоступен в данной геолокации, воспользуйтесь VPN-сервисом для возобновления просмотра контента.")
    else
      Alert.alert("Ошибка", "Произошла непредвиденная ошибка.")
  } finally {
    if (finallyCallback)
      finallyCallback()
  }


}