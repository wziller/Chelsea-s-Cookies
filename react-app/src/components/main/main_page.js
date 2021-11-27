import './main_page.css'
import { NavLink } from 'react-router-dom';
import MainBanner from '../main_banner';
import Gallery from '../gallery/gallery';


const MainPage = () => {
    return(
        <div>
            <MainBanner/>
            <h2>See what I've been working on...</h2>
            <Gallery/>
        </div>
    )
}
export default MainPage
