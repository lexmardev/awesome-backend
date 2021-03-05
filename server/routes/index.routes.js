const setRoutes = (app) => {
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
