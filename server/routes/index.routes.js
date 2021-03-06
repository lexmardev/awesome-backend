const setRoutes = (app) => {
  app.use(require('./user.routes'));
  app.use('/api/properties', require('./property.routes'));

  // Middleware para rutas inválidas
  app.use((req, res) => {
    return res.status(404).json({
      success: false,
      message: 'Path not found',
      data: {
        code: 400,
      },
    });
  });
};

module.exports = {
  setRoutes,
};
