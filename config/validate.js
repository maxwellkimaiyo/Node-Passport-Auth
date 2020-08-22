const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
    min: 6,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };
  const registerValidation = (data)=>{
    const schema = Joi.object().keys({
        name: Joi.string().min(6).max(60) .required().label("Name"),
        email: Joi.string().required().label("Email").email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: passwordComplexity(complexityOptions).required().label("Password"),
        password2:Joi.string().required().valid(Joi.ref('password')).label("Confirm Password"),
     })

     return schema.validate(data);
    
    }
    const loginValidation = (data)=>{
      const schema = Joi.object().keys({
          email: Joi.string().required().label("Email").email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password: passwordComplexity(complexityOptions).required().label("Password"),
       })
  
       return schema.validate(data);
      
      }
  
     module.exports.loginValidation = loginValidation;

    module.exports.registerValidation = registerValidation;