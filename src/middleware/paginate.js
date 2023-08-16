const defaultPage = 1;
const defaultLimit = 10;
// const FIELDS_ADDITIONAL_FILTER = ['company', 'prStatus', 'status'];

const transformInclude = rawInclude => rawInclude?.split(',');

export const paginate = (req, res, next) => {
  const { page = defaultPage, limit = defaultLimit, include } = req.query;

  // req.query = _.pick(req.query, ['sort', 'limit', 'search', 'searchFields', 'fields', ...FIELDS_ADDITIONAL_FILTER]);
  req.query.limit = parseInt(limit, 10);
  req.query.offset = (page - 1) * limit;
  req.query.include = transformInclude(include);

  res.page = (data, count, isArray = false) => {
    const currentPage = Number(page);
    const totalPage = Math.ceil(count / limit);

    // eslint-disable-next-line no-underscore-dangle
    const { pathname } = req._parsedUrl;
    const url = `${req.protocol}://${req.get('host')}${pathname}`;

    const meta = { count, limit: parseInt(limit, 10), currentPage, totalPage };
    const link = {};

    if (currentPage !== 1) link.first = `${url}?page=1&limit=${limit}`;
    if (currentPage > 1) link.prev = `${url}?page=${currentPage - 1}&limit=${limit}`;
    if (currentPage !== totalPage) link.last = `${url}?page=${totalPage}&limit=${limit}`;
    if (currentPage < totalPage) link.next = `${url}?page=${currentPage + 1}&limit=${limit}`;

    const result = isArray ? data.slice((page - 1) * limit).slice(0, limit) : data;
    res.json({ data: result, meta, link });
  };

  next();
};
