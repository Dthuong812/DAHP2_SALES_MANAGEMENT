const User =  require('../models/user')
module.exports={
    createUserService:async(userData)=>{
        try {
            const prefix = "Mb";
            const lastUser = awaitUser.findOne().sort({user_id: -1});
            let newId
            if (! lastUser) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastUser.user_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${
                    String(nextIdNumber).padStart(4, "0")
                }`;
            }
            userData.user_id = newId
            let result = await User.create(userData)
            
            return result
        } catch (error) {
            console.log(error)
        }
    },
}