const z =require('zod')

const validacao=z.object({

nome:z.string().min(3,'Mínimo 3 caracteres'),
email:z.email(),
password:z.string().min(4,'Mínimo 4 caracteres')

})


module.exports=validacao