import './main_page.css'
import { NavLink } from 'react-router-dom';
import MainBanner from '../main_banner';
import Gallery from '../gallery/gallery';
import AboutTheBakerDisplay from '../about_the_baker';
import FooterDisplay from '../footer';


const MainPage = () => {
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
