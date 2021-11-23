import './user_options_menu.css'
import UserOptionsMenu from './user_options_menu'

const UserOptionsWindow = ({userStatus, setUserStatus}) =>{
return(
    <UserOptionsMenu userStatus={userStatus} setUserStatus={setUserStatus}/>
)
}


export default UserOptionsWindow
