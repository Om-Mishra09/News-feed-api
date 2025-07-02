const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const authenticate = require('../middleware/auth');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/newsData.json');

// Utility: Load news
const loadNews = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Utility: Save news
const saveNews = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /news - get all current news with filters
router.get('/', (req, res) => {
  let news = loadNews();
  const now = new Date().toISOString();

  // Remove expired news
  news = news.filter(item => !item.expires_at || item.expires_at > now);

  const { type, priority } = req.query;

  if (type) news = news.filter(item => item.type === type);
  if (priority) news = news.filter(item => item.priority == priority);

  res.json(news.sort((a, b) => b.priority - a.priority));
});

// GET /news/:id - get single news by ID
router.get('/:id', (req, res) => {
  const news = loadNews();
  const item = news.find(n => n.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'News not found' });
  res.json(item);
});

// POST /news - create news
router.post('/', authenticate, (req, res) => {
  const news = loadNews();
  const newItem = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
    type: req.body.type,
    published_at: req.body.published_at,
    expires_at: req.body.expires_at || null,
    priority: req.body.priority || 1,
    image_url: req.body.image_url || '',
    created_by: req.body.created_by || 'system'
  };

  // Validation
  if (!newItem.title || !newItem.content || !newItem.type || !newItem.published_at) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  news.push(newItem);
  saveNews(news);
  res.status(201).json(newItem);
});

// PUT /news/:id - update news
router.put('/:id', authenticate, (req, res) => {
  let news = loadNews();
  const index = news.findIndex(n => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'News not found' });

  const updatedItem = { ...news[index], ...req.body };
  news[index] = updatedItem;
  saveNews(news);
  res.json(updatedItem);
});

// DELETE /news/:id - delete news
router.delete('/:id', authenticate, (req, res) => {
  let news = loadNews();
  const newNews = news.filter(n => n.id !== req.params.id);
  if (news.length === newNews.length) return res.status(404).json({ error: 'News not found' });

  saveNews(newNews);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
