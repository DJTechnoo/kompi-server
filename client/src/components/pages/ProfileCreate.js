import React, {useState, useContext} from 'react';
import ProfileContext from '../../context/profile/profileContext';
import { useHistory } from 'react-router-dom';

const ProfileCreate = () => {
    const history = useHistory();
    const [ profile, setProfile] = useState({
        bio: '',
        title: ''
    });

    const { bio, title } = profile;

    const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });
    const profileContext = useContext(ProfileContext);
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        profileContext.createProfile(
            {bio, title}
        );
        history.push("dashboard");
    }

  
    return(<div>
            <form onSubmit={onSubmitHandler} className="form">
                <input 
                    type="text" 
                    name="bio" 
                    onChange={onChange}
                    value={profile.bio}
                    placeholder="Beskriv deg selv..."
                />
                
                <input 
                    type="text" 
                    name="title" 
                    onChange={onChange}
                    value={profile.title}
                    placeholder="Din nåværende jobb tittel"
                />
                <input
                    type="submit"
                    value="Opprett profil"
                    className="btn btn-dark btn-block"
                />
            </form>
        </div>
    )
}

export default ProfileCreate;