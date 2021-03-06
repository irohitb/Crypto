import axios from 'axios';
import {
  CRYPTO_FETCHING, 
  CRYPTO_DATA_FAIL, 
  CRYPTO_FETCH_SUCESS, 
  UPDATE_CRYPTO_DATA, 
  GLOBAL_DATA,
  COIN_HISTORY,
  COIN_COMPLETE,
  CRYPTO_FETCHING_HISTORY
} from './type.js';
import {
  ApiCoinCap, 
  GlobalData,
  coinCapHistory,
  coinCapComplete
 } from '../urls.js';



//Fetching an Error Hanling of Crypto Data (of all coins)
export const fetchCoin = () => {
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
    return axios.get(ApiCoinCap).then((response) => {
    return(
    dispatch({
      type: CRYPTO_FETCH_SUCESS,
      payload: response.data
    })
  )
  }).catch((error) => {
    return (
  dispatch({
      type: CRYPTO_DATA_FAIL,
      payload: error.data
    })
  )
})
 }
}

//Fetching Global Data 
export const globalData = () => { 
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
     return axios.get(GlobalData).then((response) => {
    return(
      dispatch({
        type: GLOBAL_DATA,
        payload: response.data
      })
    )
    }).catch((error) => {
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
  })   
  }
}

//Updating Cryto Data
export const updateCrypto = (updatedData) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CRYPTO_DATA,
      payload: updatedData
    })
  }
}





//Coin history 
export const coinHistory = (days, coinName) => {
    return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING_HISTORY}) 
    return axios.get(coinCapHistory + days + "day/" + coinName).then(respone => {
      let coinHistoryV = []
      for (let i = 0; i<respone.data["price"].length; i++) {
        coinHistoryV.push({
            cHT : respone.data["price"][i][0],
            y : respone.data["price"][i][1],
            cHTVF :  respone.data["price"][i][1].toLocaleString(),
            x: i
        })
    }
      return (
          dispatch({
            type: COIN_HISTORY,
            payload: coinHistoryV
          })
        )
    }).catch((error) => {
      console.log("This is Error", error)
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
    })   
  }
}

//Coin Complete 
export const coinComplete = (coinName) => {
  return function (dispatch) {
    dispatch({type: CRYPTO_FETCHING}) 
   return axios.get(coinCapComplete + coinName).then((respone) => {
      return (
        dispatch({
          type: COIN_COMPLETE,
          payload: respone.data
        })
      )
    }).catch((error) => {
      console.log("This is Error", error)
      return (
    dispatch({
        type: CRYPTO_DATA_FAIL,
        payload: error.data
      })
    )
    })   
  }
}


//Coin Complete Info 


// //7 Day history 
// export const SevenDayCoinHistory = (days, coinName) => {
  
// }

// //30 Day History 
// export const ThirtyDayCoinHistory = (coinName) => {
  
// }
// //90 Day History 
// export const NintyDayCoinHistory = (coinName) => {
  
// }
// //180 Day History 
// export const One80DayCoinHistory = (coinName) => {
  
// }
// //365 Day History 
// export const Three65DayCoinHistory = (coinName) => {
  
// }
