// Server side logic for data fetching...

const url = 'https://fakestoreapi.com/products/';

const FakeStoreApi = {

    fetchAllProduct: async () => {
        const res = await fetch(url);
        const result = await res.json();
        return result;
    },

    fetchProductById: async (id) => {
        const res = await fetch(url + id);
        const result = await res.json();
        return result;
    },

    fetchProductBySearch: async (query) => {
        const res = await fetch(url);
        const result = await res.json();
        return result.filter(item => item?.title?.toLowerCase().includes(query));
    }

}

export default FakeStoreApi;