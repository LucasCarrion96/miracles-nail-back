// vite.config.js
export default {
  resolve: {
    alias: {
      '@models': '/src/models',
      '@crudController': '/src/modules/baseController/crudController.js',
      '@sequelize': '/src/sequelize-config/sequelize-config.js',
      '@catalogsRoutes': '/src/modules/catalogs/routes',
      '@authRoutes': '/src/modules/auth/routes',
      '@userRoutes': '/src/modules/user/routes',
      '@servicesRoutes': '/src/modules/services/routes',
      '@utils': '/src/utils'
    }
  }
}