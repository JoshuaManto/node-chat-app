[{
  id: '212323adsf',
  name: 'Andrew',
  room: 'The Office Fans'
}]

// addUser (id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users
{
  constructor()
  {
    this.users = []
  }

  addUser (id, name, room)
  {
    var user = {id, name, room}
    this.users.push(user);
    return user;
  }

  removeUser (id)
  {
    // return user that was removed
    var user = this.getUser(id);

    if(user)
    {
      this.users = this.users.filter((user) => user.id !== id)
    }

    return user;
  }

  getUser(id)
  {
    var user = this.users.filter((user) => user.id === id)[0];

    return user;
  }

  getUserList(room)
  {
    // ['Mike', 'Jen', 'Caleb']
    // true to keep and false to remove for filter()
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

}

module.exports = {Users};


// class Person
// {
//   constructor (name, room)
//   {
//     this.name= name;
//     this.room= room;
//   }
//
//
//
//
// }
//
// var me = new Person('josh', 25);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
