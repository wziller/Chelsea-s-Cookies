import './main_page.css'
import { NavLink } from 'react-router-dom';
import MainBanner from '../main_banner';
import Gallery from '../gallery/gallery';
import AboutTheBakerDisplay from '../about_the_baker';
import FooterDisplay from '../footer';
import { useEffect } from 'react';
import { getUsers } from '../../store/user';
import { getProducts } from '../../store/product';
import { getOrdersByUserId } from '../../store/order';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/review';


const MainPage = () => {
    const user = useSelector((state)=>state.session.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
        dispatch(getReviews())
       if(user) dispatch(getOrdersByUserId(user.id))
    },[])

    return(
        <div>
            <MainBanner/>
            <h2>See what I've been working on...</h2>
            <Gallery/>
            <h2>About the baker...</h2>
            <AboutTheBakerDisplay/>
        </div>
    )
}
export default MainPage
