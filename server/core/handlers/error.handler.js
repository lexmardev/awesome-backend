const internalError = 'Internal server error';

const verifyError = (error) => {
  if (error.code === 11000) {
    return {
      status: 400,
      code: 402,
      message: `Property already exists in database: ${Object.keys(error.keyValue)}`,
    };
  }

  if (error.message.includes('Cast to ObjectId failed for value')) {
    return { status: 400, code: 404, message: 'Invalid identifier' };
  }

  if (error.message.includes('Data could not be encrypted') || error.message.includes('Data could not be compared')) {
    return { status: 500, code: 502, message: internalError };
  }

  if (error.message.includes('Failed to sign')) {
    return { status: 500, code: 503, message: internalError };
  }

  if (error.message.includes('Could not send email')) {
    return { status: 500, code: 504, message: internalError };
  }
  // TODO delete console

  // eslint-disable-next-line no-console
  console.log('=============:', Object.keys(error));
  // eslint-disable-next-line no-console
  console.log('=============:', error);
  // eslint-disable-next-line no-console
  console.log('=============:', error.name);
  // eslint-disable-next-line no-console
  console.log('=============:', error.message);

  return { status: 500, code: 500, message: 'Unexpected error, review is required' };
};

const handleRequest = (request) => {
  return (req, res) => {
    request(req, res).catch((error) => {
      const err = verifyError(error);

      return res.status(err.status).json({
        success: false,
        message: err.message,
        data: {
          code: err.code,
        },
      });
    });
  };
};

module.exports = {
  handleRequest,
};
