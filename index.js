const express = require('express');
const newsRoutes = require('./routes/news');
const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON bodies
app.use('/news', newsRoutes); // all routes prefixed with /news

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
