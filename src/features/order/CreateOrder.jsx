
import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EmptyCart from "../cart/EmptyCart"
import { getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
 

function CreateOrder() {

const [setFirstName] = useState("")
const [phone,setPhone] = useState("")
const [withPriority, setWithPriority] = useState(false)
const [userAddress,setUserAddress] = useState("")

  const navigation = useNavigation();
 
  const dispatch = useDispatch()

 
  const isSubmitting = navigation.state === 'submitting';
  const username = useSelector(state => state.user.username)

  const formErrors = useActionData();
  
  const cart = useSelector(state => state.cart.cart)
  console.log(cart)
   const cartPrice = useSelector(getTotalCartPrice)
  
   const PriorityPrice = withPriority ? cartPrice + cartPrice * 0.2 : cartPrice

   const {status,address,error} = useSelector(state => state.user)

  if(!cart.length) return <EmptyCart />
  const isLoadingAddress = status === "loading" 

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer"
          defaultValue={username}
          onChange={e => setFirstName(e.target.value)}
          required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone"
             value={phone}
             onChange={e => setPhone(e.target.value)}
            required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40 ">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              placeholder={isLoadingAddress ? "Loading" : "" }
              disabled={isLoadingAddress}
              required
              defaultValue={userAddress}
              onChange={(e) =>{ setUserAddress(e.target.value)}}
            />
             {status === "rejected" && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {error}
              </p>
             )}
          </div>
         {!address && <span className='absolute right-1 z-3'>
            <Button type="small" onClick={(e) =>{
               e.preventDefault()
              dispatch(fetchAddress())}}>Get Position</Button>
          </span>}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            disabled={isLoadingAddress}
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary" >
            {isSubmitting ? 'Placing order....' : 'Order now'}  { formatCurrency(PriorityPrice)}
          </Button>
         
        </div>
      </Form>
    </div>
  );
}



export default CreateOrder;
