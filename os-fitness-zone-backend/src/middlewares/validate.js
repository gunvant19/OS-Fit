const { z } = require('zod');

const validate = (schema) => async (req, res, next) => {
  try {
    console.log(`[Validation] Validating ${req.method} ${req.url}`);
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message }))
      });
    }
    console.error('Validation Middleware Error:', error);
    return res.status(500).json({ message: 'Internal server error during validation', error: error.message });
  }
};

module.exports = validate;
