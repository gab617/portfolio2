import {urls_ping} from './assets/jsonData.json'


export function objectUrlsPing (){
    let id = 0
    let array = urls_ping.map(urlPing =>{
        let obj ={
            id: id,
            url: urlPing,
            active: false
        }
        id++
        return obj
    })
    return array
}