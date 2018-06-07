var socket = io();

function scrollToBottom ()
{
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  // last list child
  var newMessageHeight = newMessage.innerHeight();
  // this will then be 2nd to the last child
  var lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }



}

socket.on('connect',function ()
{
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err)
  {
    if (err)
    {
      // Can change the alert with a modal depending on the framework of choice like bootstrap or others
      alert(err);
      window.location.href = '/';
    }
    else
    {
      console.log('No error');
    }
  });

});

socket.on('disconnect', function ()
{
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users)
{
  console.log('Users List', users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user)
  {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message)
{
  // TEMPLATING
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,
  {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // console.log('newMessage', message);
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

// no need since theres a form
// socket.emit('createMessage',
// {
//   from: 'Frank',
//   text: 'Hey'
// }, function (data)
// {
//   console.log('Got it', data);
// });

socket.on('newLocationMessage', function (message)
{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,
  {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e)
{
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',
  {
    from: 'User',
    text: messageTextBox.val()
  }, function ()
  {
    messageTextBox.val('');
  });
});

// GEO LOCATION
var locationButton = jQuery('#send-Location');
locationButton.on('click', function ()
{
  if(!navigator.geolocation)
  {
    // can change this alert if you use bootstrap or foundation or another type of frontend api / framework
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location');

  navigator.geolocation.getCurrentPosition(function (position)
  {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',
    {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function ()
  {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});