var request = {
  type: 'subscribe',
  email: 'itsankoff@gmail.com',
};

fetch('http://localhost:9999/api/subscribe', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(request),
}).then((res) => {
  console.log(res.statusText);
  console.log(res.type);
  res.text().then((text) => {
    console.log(text);
  });
}).catch((err) => {
  console.error(err);
});
