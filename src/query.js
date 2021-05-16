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
    if (!res.ok){return({error:res.status})}
    const resJson =  await res.json()
    console.log("res:", resJson)
    return resJson
}

const post = async (target, body, token) => {
    console.log({target:process.env.REACT_APP_IOEXPANDER_API_URL + target, body, token})
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
    console.log(res)
    if (!res.ok){
        return({error:res.status})
    }

    const resJson =  await res.json()
    console.log("res:", resJson)
    return resJson
}

const deleteRequest = async (target, token) => {
    try{
        const res = await fetch(
            process.env.REACT_APP_IOEXPANDER_API_URL + target,
            {
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }
        )
        if (!res.ok){return({error:res.status})}

        const resJson =  await res.json()
        console.log("res:", resJson)
        return resJson
    } catch(err){
        console.log(err)
    }
}

const put = async (target, body, token) => {
    console.log({target, body, token})
    const res = await fetch(
        process.env.REACT_APP_IOEXPANDER_API_URL + target,
        {
            method:"PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }
    )
    console.log(res)
    if (!res.ok){
        return({error:res.status})
    }

    const resJson =  await res.json()
    console.log("res:", resJson)
    return resJson
}

const query = {
    get,
    post,
    put,
    deleteRequest
}

export default query