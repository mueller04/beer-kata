import axios from 'axios';

const getBeerMenu = async () => {
    return await axios.get(`https://api.punkapi.com/v2/beers`, { 
        params: {
            per_page: 80
        }
    });
}

export default getBeerMenu;