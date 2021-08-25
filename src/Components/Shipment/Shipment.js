import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>{ console.log(data)};
  
    console.log(watch("example")); 
  
    return (
      
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" placeholder="Your name"{...register("exampleRequired", { required: true })} />
        {errors.name && <span className="error">This field is required</span>}
        
        <input name="email" defaultValue={loggedInUser.email} placeholder="Your Email"{...register("exampleRequired", { required: true })} />
        {errors.email && <span className="error">This Email is required</span>}

        <input name="phone" placeholder="Your Phone Number"{...register("exampleRequired", { required: true })} />
        {errors.phone && <span className="error">This Phone Number is required</span>}

        <input name="address" placeholder="Your Address "{...register("exampleRequired", { required: true })} />
        {errors.address && <span className="error">This Address is required</span>}

        <input type="submit" />
      </form>
    
    );
};

export default Shipment;