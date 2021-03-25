const query = async (target, method="GET", body) => {
    const res = await fetch(
        process.env.REACT_APP_IOEXPANDER_API_URL + target,
        {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    const resJson =  await res.json()
    console.log("res:", resJson)
    return resJson
}

export default query