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
}

export {
    get,
    post
}