const z =require('zod')

const autentificao=z.object({

nome:z.string().min(3),
email:z.email(),
password:z.string().min(4)

})

module.exports=autentificao