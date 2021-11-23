import './user_options_menu.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'

const UserOptionsMenu = ({userStatus, setUserStatus}) => {
    const user = useSelector(state => state.session.user)
    return user && userStatus === 'visible' ? (
        <div id='user_menu'>
            <h3>Account Settings</h3>
            <p className='usermenuinfo'>Name: {`${user.firstName} ${user.lastName}`}</p>
            <p className='usermenuinfo'>Username: {user.name}</p>
            <p className='usermenuinfo'>Email: {user.email}</p>
            <p className='usermenuinfo'>Phone: {user.phone}</p>
            <hr></hr>
            <NavLink to='user_orders'><button className="user_menu_buttons" onClick={()=>setUserStatus('hidden')}>Orders</button></NavLink>
            <LogoutButton className="user_menu_buttons" userStatus={userStatus} setUserStatus={setUserStatus} />
        </div>
    ) : (<></>)
}


export default UserOptionsMenu
