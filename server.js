const fs = require('fs');

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

// your existing routes follow...

  const donorEntry = {
    name,
    email,
    phone,
    address,
    date: new Date().toISOString()
  };

  // Save to a local file
  fs.readFile('donors.json', 'utf8', (err, data) => {
    let donors = [];
    if (!err && data) {
      try {
        donors = JSON.parse(data);
      } catch (e) {
        donors = [];
      }
    }

    donors.push(donorEntry);

    fs.writeFile('donors.json', JSON.stringify(donors, null, 2), (err) => {
      if (err) {
        console.error('Failed to save donor:', err);
        return res.status(500).send('Error saving donor.');
      }

      console.log('Donor saved:', donorEntry);
      // For now, send fake clientSecret (replace with Stripe later)
      res.send({ clientSecret: 'fake_client_secret_for_demo' });
    });
  });
});
