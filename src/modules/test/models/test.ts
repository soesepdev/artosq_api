import db from '../../../config/db';

export const getTest = async () => {
  const { result } = await db.one(`SELECT 'DB OK' AS result`);
  return {
    message: result
  };
};