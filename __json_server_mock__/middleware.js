module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    // 捕获login请求
    if (req.body.username === 'lizheng' && req.body.password === '123456') {
      return res.status(200).json({
        // 使用jwt格式
        user: {
          token: 123,
        },
      });
    } else {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
  }
  next();
};
