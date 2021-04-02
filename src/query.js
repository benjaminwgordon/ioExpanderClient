const get = async (target, token) => {
    const res = await fetch(
        process.env.REACT_APP_IOEXPANDER_API_URL + target,
        {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }
    )
    const resJson =  await res.json()
    console.log("res:", resJson)
    return resJson
}

const post = async (target, body, token) => {
    try{
        console.log("token",token)
        const res = await fetch(
            process.env.REACT_APP_IOEXPANDER_API_URL + target,
            {
                method:"POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }
        )
        
        const resJson =  await res.json()
        console.log("res:", resJson)
        return resJson
    } catch(err){
        console.log(err)
    }
}

const query = {
    get,
    post
}

export default query