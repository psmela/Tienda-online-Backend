const register = async (req, res)=>{ 
    try {
        res.status(200).send('register')
    } catch (error) {
        res.status(500).send(error)
    }
}

const login = async (req, res)=>{
    try {
        res.status(200).send('login')
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {register, login}