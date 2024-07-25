import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";

//todo: add headers and other methods...
export async function get<T> (url: string, callback: (response: AxiosResponse<T, any>) => void, finallyCallback?: () => void | undefined) {
    try{
        let result = await axios.get<T>(url, { 
            validateStatus: function(status) {
              return status < 500;
            }
          })
        callback(result)
        
    } catch(error){
        if (axios.isAxiosError(error) && error.response)
            Alert.alert("", "Ошибка catch" + error.response?.data)
          else
            Alert.alert("", "Ошибка catch" + error)
    } finally {
        if (finallyCallback)
            finallyCallback()
    }

    
}