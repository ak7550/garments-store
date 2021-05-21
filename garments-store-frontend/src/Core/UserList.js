import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getFollowersAPI, getFollowingsAPI } from '../API/User';
import { MainLayOutContext } from '../Components/MainLayOut';
import UserCard from '../Components/UserCard';

const UserList = ({ follower = false, following = false }) => {
    const { userId } = useParams();
    const { user, sideBar } = useContext(MainLayOutContext);
    const [friendList, setFriendList] = useState([user]);

    useEffect(() => {
        // follower && getFollowersAPI(userId, data => setFriendList(data));
        // following && getFollowingsAPI(userId, data => setFriendList(data));
    }, [sideBar]);

    return (
        <div>
            {
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    // alignItems="flex-start"
                    // wrap
                    style={{
                        // marginLeft: "20em"

                    }}
                >
                    {
                        friendList.map((friend, index) => (
                            <Grid item xs={12}
                                style={{
                                    paddingLeft: '',
                                    // border: '2px solid black'
                                }}
                            >
                                <UserCard info={friend} />
                            </Grid>
                        ))

                    }

                </Grid>
            }
        </div>
    )
}

export default UserList
