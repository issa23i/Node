const customHeader = (req, res, next) => {
    try {
        // TODO: si hay que hacer api keys
        /** 
        const apiKey = req.headers.api_key
        if(apiKey === 'HolaIsa'){
            next()
        } else {
            res.status(403)
            res.send({error:'API_KEY_INVALIDA'})
        }*/
        next()
    } catch (err) {
        res.status(403)
        res.send({error:'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER'})
    }
}


module.exports = customHeader