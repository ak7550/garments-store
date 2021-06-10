import { Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { getAllUsersAPI, getFollowersAPI, getFollowingsAPI } from '../API/User';
import Footer from '../Components/Footer';
import { MainLayOutContext } from '../Components/MainLayOut';
import UserCard from '../Components/UserCard';

const UserList = ({ follower = false, following = false, all = false }) => {
    const { user } = useContext(MainLayOutContext);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        all && getAllUsersAPI(arr => setFriendList(arr));
        follower && setFriendList(user.followers);
        following && setFriendList(user.followings);
    }, []);

    useEffect(() => {
        follower && setFriendList(user.followers);
        following && setFriendList(user.followings);
    }, [user])

    return (
        <div>
            {
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    // alignItems="flex-start"
                    wrap
                    style={{
                        marginTop: "2em"

                    }}
                >
                    {
                        friendList.length >0 &&
                        friendList.map((friend, index) => (
                            friend._id !== user._id &&
                            <Grid
                                item
                                xs={12}
                                style={{
                                    paddingLeft: '',
                                    // border: '2px solid black'
                                }}
                                key={index}
                            >
                                <UserCard id={friend}
                                    follower={follower}
                                    following={following}
                                    all={all}
                                />
                            </Grid>
                        ))

                    }
                    {
                        friendList.length === 0 &&
                        <Typography variant="h3" align="center">NO ONE!!</Typography>
                    }

                </Grid>
            }
            <Footer />
        </div>
    )
}

export default UserList
