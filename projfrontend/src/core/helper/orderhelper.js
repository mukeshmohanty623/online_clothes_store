import { API } from "../../backend";

export const createCart = (userId,token,orderData)=>{
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({order:orderData})
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        return console.log(err);
    })
} 