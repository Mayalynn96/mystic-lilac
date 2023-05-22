import React, {useEffect, useState} from 'react';
import API from '../../utils/API';
import { useParams } from "react-router-dom";
import './Profile.css';

function Profile({userId}) {
    const params = useParams();
    console.log(params);
    const [user, setUser] = useState({});
    const [isMyPage, setIsMyPage] = useState(false);
    const fetchUser = () => {
        API.getUserData(params.id).then((data) => {
            setUser(data);
            console.log(userId);
            if (userId == params.id) {
                setIsMyPage(true);
            } else {
                setIsMyPage(false);
            }
        });
    };
    useEffect(() => {
        fetchUser();
    }, [userId, params.id]);
    return (
        <main id="profilePage">
            {isMyPage && <h1>Welcome to your profile</h1>}
            <h2>{user.username}</h2>
            <img src={user.profilePicture} id="profilePicture" alt="profile" />
        </main>
    )
}

export default Profile;