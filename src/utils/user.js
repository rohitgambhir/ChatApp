const users = []
// addUser , removeUser , getUser , getUsersInRoom.

const addUser = ({id , username , room}) => {
    // clean the data 
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data 
    if(!username || !room){
        return {
             error: 'Username and room are required!'
        }
    }

    // check for exisiting user 
    const exisitingUser = users.find((user)=>{
          return user.room===room && user.username===username
    })
    // validate username
    if(exisitingUser){
        return {
            error: 'Username is in use!'
        }
    }
    // store users 
    const user = {id , username , room}
    users.push(user);
    return { user }
}




const removeUser=(id)=>{
const index=users.findIndex((user)=>{
     return user.id===id
})
if(index !== -1){
    return users.splice(index , 1)[0];

}
}



addUser({
    id:22 ,
    username: 'Andre   ',
    room: 'South'
})
console.log(users);
const removedUser=removeUser(22)
console.log(users)
console.log(removedUser)





const res = addUser({
    id:33,
    username:'andrre',
    room:'south'
})
console.log(res);