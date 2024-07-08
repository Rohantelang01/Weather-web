


async function fetchData(){
    const url = 'https://me-weather.p.rapidapi.com/?get=weather&city=Mumbai';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '721c9a4266msh442c91222908857p1207e0jsnb7e89ff122f4',
            'X-RapidAPI-Host': 'me-weather.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse response as JSON
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    
}
fetchData()

