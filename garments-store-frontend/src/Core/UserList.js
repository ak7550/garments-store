import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getFollowersAPI, getFollowingsAPI } from '../API/User';
import { MainLayOutContext } from '../Components/MainLayOut';
import UserCard from '../Components/UserCard';

const UserList = ({ follower = false, following = false }) => {
    const { userId } = useParams();
    const { sideBar } = useContext(MainLayOutContext);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        follower && getFollowersAPI(userId, data => setFriendList(data));
        following && getFollowingsAPI(userId, data => setFriendList(data));
    }, [sideBar]);

    return (
        <div>
            {
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap
                    // style={{
                    //     marginLeft: "20em"
                    // }}
                >
                    {
                        friendList.length &&
                        friendList.map((friend, index) => (
                            <Grid item
                                style={{
                                    paddingLeft: '1em',
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
