import { allProductsUrl } from './util.js';

const fetchProducts = async () => {
    try{
        const response = await fetch(allProductsUrl)
        if(response){
            return response.json()
        }
        return response

    }
    catch(err){
        console.log(err)
    }
};

export default fetchProducts;
