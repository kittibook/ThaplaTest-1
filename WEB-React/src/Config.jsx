const Configurl = {
    Url : "https://apithaplatest.bxoks.online",
    headers: () => {
        return{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('BX_Token'),
            },
        };
    },
}

export default Configurl